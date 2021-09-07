import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSeriesTitle: protectedResolver(async (_, { keyword, lastId }, { loggedInUser }) => {
      try {
        const series = await client.series.findMany({
          where: {
            author: {
              id: loggedInUser.id,
            },
            title: {
              startsWith: keyword
            }
          },
          select: {
            id: true,
            title: true
          },
          take: 2,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            title: "asc",
          },
        })
        return {
          ok: true,
          series: series,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: e
          //error: "cant get series"
        };
      }
    })
  }
}