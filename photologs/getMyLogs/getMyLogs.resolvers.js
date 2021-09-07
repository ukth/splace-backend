import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getMyLogs: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const mine = await client.photolog.findMany({
          where: {
            authorId: loggedInUser.id
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
          mine: mine
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get my logs"
        };
      }
    })
  }
}