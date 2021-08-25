import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSeries: protectedResolver(async (_, { seriesId, lastId }, { loggedInUser }) => {
      try {
        const series = await client.photolog.findMany({
          where: {
            seriesId
          },
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
        return series;
      } catch (e) {
        return null;
      }
    })
  }
}