import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    getLogsByBigCategory: protectedResolver(async (_, { tagId, lastId }, { loggedInUser }) => {
      try {
        const logs = await client.photolog.findMany({
          where: {
            bigCategories: {
              some: {
                id: tagId
              }
            },
            isPrivate: false,
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
          },
          include: {
            splace: true,
            categories: true,
            bigCategories: true,
            specialtags: true,
            author: true,
            series: true,
          },
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc"
          },
        })
        const logging = await client.seeCategoryLog.create({
          data: {
            userId: loggedInUser.id,
            categoryId: tagId,
            categoryType: 1
          }
        })
        return {
          ok: true,
          logs: logs
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