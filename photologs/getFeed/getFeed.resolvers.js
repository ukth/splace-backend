import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFeed: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const logs = await client.photolog.findMany({
          where: {
            OR: [
              {
                author: {
                  followers: {
                    some: {
                      userId: loggedInUser.userId,
                    },
                  },
                },
              },
              {
                authorId: loggedInUser.userId,
              },
            ],
            NOT: [
              {
                author: {
                  blockingUser: {
                    some: {
                      userId: loggedInUser.userId
                    }
                  }
                },
              },
              {
                hiddenUsers: {
                  some: {
                    userId: loggedInUser.userId
                  }
                }
              },
            ]
          },
          include: {
            hashtags: true,
            splace: true,
            author: true,
            series: true,
            likedUser: true,
          },
          take: 5,
          ...(lastId && { cursor: { photologId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        const lastCreated = logs[logs.length - 1].createdAt;
        const series = await client.series.findMany({
          where: {
            OR: [
              {
                author: {
                  followers: {
                    some: {
                      userId: loggedInUser.userId,
                    },
                  },
                },
                createdAt: {
                  gt: lastCreated
                }
              },
              {
                authorId: loggedInUser.userId,
                createdAt: {
                  gt: lastCreated
                }
              },
            ],
            NOT: [
              {
                author: {
                  blockingUser: {
                    some: {
                      userId: loggedInUser.userId
                    }
                  }
                },
              },
              {
                hiddenUsers: {
                  some: {
                    userId: loggedInUser.userId
                  }
                }
              },
            ]
          },
          include: {
            author: true,
            photologs: true,
          },
          take: 5,
          ...(lastId && { cursor: { seriesId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          logs: logs,
          series: series,
        };
      } catch (e) {
        return {
          ok: false,
          error: e
        };
      }
    })
  }
}