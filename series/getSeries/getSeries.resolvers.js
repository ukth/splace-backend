import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSeries: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const series = await client.series.findMany({
          where: {
            authorId: loggedInUser.userId,
          },
          take: 2,
          ...(lastId && { cursor: { photologId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          logs: logs,
          series: series,
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get series"
        };
      }
    })
  }
}