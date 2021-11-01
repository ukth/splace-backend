import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getUserLogs: protectedResolver(async (_, { userId, lastId }, { loggedInUser }) => {
      try {
        const logs = await client.photolog.findMany({
          where: {
            ...(userId === loggedInUser.id && { authorId: userId }),
            ...(userId !== loggedInUser.id && { authorId: userId, isPrivate: false })
          },
          include: {
            categories: true,
            bigCategories: true,
            splace: true,
            author: true,
            seriesElements: {
              include: {
                sereis: true
              }
            },
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
          logs
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4215"
        };
      }
    })
  }
}