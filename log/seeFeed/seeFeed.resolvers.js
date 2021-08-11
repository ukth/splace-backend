import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeFeed: protectedResolver(async (_, { userId }) => {
      const feed = await client.log.findMany({
        where: {
          userId,
        },
        include: {
          photologs: {
            include: {
              hashtags: true,
              splace: true
            }
          },
          user: true
        }
      })
      return feed;
    })
  }
}