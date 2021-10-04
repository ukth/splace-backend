import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getUserSeries: protectedResolver(async (_, { userId, lastId }, { loggedInUser }) => {
      try {
        const series = await client.series.findMany({
          where: {
            author: {
              id: userId,
            },
            isPrivate: false,
          },
          take: 10,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            photologs: true,
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
          error: "cant get series"
        };
      }
    })
  }
}
