import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logGetLogsBySeries: protectedResolver(async (_, { seriesId }, { loggedInUser }) => {
      try {
        const logging = await client.seeSeriesLog.create({
          data: {
            userId: loggedInUser.id,
            seriesId
          }
        })
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4231"
        };
      }
    })
  }
}