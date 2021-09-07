import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFeed: protectedResolver(async (_, { lastLogId, lastSeriesId }, { loggedInUser }) => {
      try {
        const logs = await client.photolog.findMany({
          where: {
            OR: [
              {
                author: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                authorId: loggedInUser.id,
              },
            ],
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
            hashtags: true,
            splace: true,
            author: true,
            series: true,
            likedUser: true,
          },
          take: 2,
          ...(lastLogId && { cursor: { id: lastLogId } }),
          skip: lastLogId ? 1 : 0,
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
                      id: loggedInUser.id,
                    },
                  },
                },
                createdAt: {
                  gt: lastCreated
                }
              },
              {
                authorId: loggedInUser.id,
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
            author: true,
            photologs: true,
          },
          ...(lastSeriesId && { cursor: { id: lastSeriesId } }),
          skip: lastSeriesId ? 1 : 0,
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