import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getMoments: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const moments = await client.moment.findMany({
          where: {
            authorId: loggedInUser.id
          },
          include: {
            splace: true,
            author: true,
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
          moments
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get moments"
        };
      }
    })
  }
}