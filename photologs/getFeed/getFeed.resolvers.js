import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFeed: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      const feed = await client.photolog.findMany({
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
      return feed;
    })
  }
}