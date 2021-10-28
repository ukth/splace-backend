import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getLogsBySplace: protectedResolver(async (_, { splaceId, orderBy, lastId }, { loggedInUser }) => {
      try {
        if(orderBy !== "time" && orderBy !== "like"){
          return {
            ok: false,
            error: "ERROR1241"
          }
        }
        var logs = null;
        if (orderBy == "time") {
          logs = await client.photolog.findMany({
            where: {
              splaceId,
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
              seriesElements: {
                include: {
                  series: true
                }
              },
            },
            take: 5,
            ...(lastId && { cursor: { id: lastId } }),
            skip: lastId ? 1 : 0,
            orderBy: {
              createdAt: "desc",
            },
          })
        }
        if (orderBy == "like") {
          logs = await client.photolog.findMany({
            where: {
              splaceId,
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
              seriesElements: {
                include: {
                  series: true,
                }
              }
            },
            take: 5,
            ...(lastId && { cursor: { id: lastId } }),
            skip: lastId ? 1 : 0,
            orderBy: {
              likedUser: {
                _count: "desc"
              },
            },
          })
        }
        return {
          ok: true,
          logs: logs
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4241"
        };
      }
    })
  }
}