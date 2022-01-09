import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getUserSeries: protectedResolver(async (_, { userId, lastId }, { loggedInUser }) => {
      try {
        const series = await client.series.findMany({
          where: {
            ...(userId === loggedInUser.id && { authorId: userId }),
            ...(userId !== loggedInUser.id && { authorId: userId, isPrivate: false })
          },
          take: 20,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            photologs: {
              include: {
                photolog: true,
              },
              orderBy: {
                order: "desc"
              },
            },
            author: true
          }
        })
        return {
          ok: true,
          series: series,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4314"
        };
      }
    })
  }
}
