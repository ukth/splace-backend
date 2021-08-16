import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFeed: protectedResolver(async (_, { authorId }) => {
      const feed = await client.photolog.findMany({
        where: {
          authorId: authorId,
        },
        include: {
          hashtags: true,
          splace: true,
          author: true,
          series: true,
          likedUser: true,
        }
      })
      return feed;
    })
  }
}