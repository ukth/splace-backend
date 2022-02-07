import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logGetLogsBySeries: protectedResolver(async (_, { seriesId }, { loggedInUser }) => {
      try {
        const time = new Date().toISOString().slice(0, 23)
        const table = dataset.table('seeSeriesLog')
        const rows = [
          {
            userId: loggedInUser.id,
            seriesId: seriesId,
            createdAt: time
          }
        ]
        const log = await table.insert(rows)
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