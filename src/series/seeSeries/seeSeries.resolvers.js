import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeSeries: protectedResolver(async (_, { seriesId }, { loggedInUser }) => {
      try {
        const series = await client.series.findFirst({
          where: {
            id: seriesId
          },
          include:{
            author: true
          },
        })
        return {
          ok: true,
          series
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4301"
        };
      }
    })
  }
}