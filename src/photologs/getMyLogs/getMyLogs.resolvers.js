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
            categories: true,
            bigCategories: true,
            splace: true,
            author: true,
            series: true,
            likedUser: true,
            specialtags: true,
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
        console.log(e);
        return {
          ok: false,
          error: "ERROR4214"
        };
      }
    })
  }
}