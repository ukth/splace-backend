import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSeries: protectedResolver(async (_, { seriesId, lastId }, { loggedInUser }) => {
      try {
        const logs = await client.series.findUnique({ where: { seriesId } })
        .photologs({
          include: {
            splace: true,
          },
          take: 5,
          ...(lastId && { cursor: { photologId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "asc",
          },
        })
        return logs;
      } catch (e) {
        console.log(e)
        return null;
      }
    })
  }
}