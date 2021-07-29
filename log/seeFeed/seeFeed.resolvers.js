import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeFeed: protectedResolver( async (_, { userId } ) => 
    {
      const feed = await client.log.findMany({
        where: {
          userId,
        },
        select: {
          logId: true,
          title: true,
          createdAt: true,
          photologs: {
            select: {
              photologId: true,
              imageUrls: true,
              text: true,
              splace: {
                select: {
                  splaceId: true,
                  name: true,
                }
              },
              hashtags:   true,
              createdAt:  true
            }
          }
        },
      })
      console.log(feed);
      return feed;
    }
  )
  }
}