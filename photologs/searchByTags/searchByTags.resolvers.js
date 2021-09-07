import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    searchByTags: protectedResolver(async (_, { hashtagId, lastId }, { loggedInUser }) => {
      try {
        const feed = await client.photolog.findMany({
          where: {
            hashtags: {
              some: { id: hashtagId }
            },
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
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          logs: feed
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant search"
        }
      }
    })
  }
}