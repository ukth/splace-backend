import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getLogsBySeries: protectedResolver(async (_, { seriesId, lastId }, { loggedInUser }) => {
      try {
        const ok = await client.series.findFirst({
          where: {
            id: seriesId,
            NOT: [
              {
                author: {
                  blockingUser: {
                    some: {
                      id: loggedInUser.id
                    }
                  }
                },
              },
              {
                hiddenUsers: {
                  some: {
                    id: loggedInUser.id
                  }
                }
              },
            ]
          }
        })
        if (ok.isPrivate && ok.authorId != loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR####"
          }
        }

        const seriesElements = await client.seriesElement.findMany({
          where: {
            seriesId,
            ...(loggedInUser.id != ok.authorId && { photolog: { isPrivate: false } })
          },
          include: {
            photolog: {
              include: {
                splace: true,
                categories: true,
                bigCategories: true,
                specialtags: true,
                author: true,
                seriesElements: {
                  include: {
                    series: true
                  }
                },
              }
            },
          },
          take: 10,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            order: "asc"
          }
        })
        return {
          ok: true,
          seriesElements
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4231"
        };
      }
    })
  }
}