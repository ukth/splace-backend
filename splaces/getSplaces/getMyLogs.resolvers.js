import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getMyLogs: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      const Mine = await client.photolog.findMany({
        where: { 
          authorId: loggedInUser.userId
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
      return Mine;
    })
  }
}