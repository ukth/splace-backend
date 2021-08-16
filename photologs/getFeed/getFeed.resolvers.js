import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFeed: protectedResolver(async (_, { userId }) => {
      const feed = await client.photolog.findMany({
        where: {
          author: userId,
        },
        include: {
          hashtags: true,
          splace: true,
          user: true,
          series: true,
          likedUser: true,
          scrap: true,
        }
      })
      return feed;
    })
  }
}