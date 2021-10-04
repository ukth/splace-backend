import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getMySeries: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const series = await client.series.findMany({
          where: {
            author: {
              id: loggedInUser.id,
            }
          },
          take: 2,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            photologs: true,
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