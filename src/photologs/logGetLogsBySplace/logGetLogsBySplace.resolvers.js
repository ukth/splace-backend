import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logGetLogsBySplace: protectedResolver(async (_, { splaceId }, { loggedInUser }) => {
      try {
        const time = new Date().toISOString().slice(0, 23)
        const table = dataset.table('seeSplaceLog')
        const rows = [
          {
            userId: loggedInUser.id,
            splaceId: splaceId,
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
          error: "ERROR4241"
        };
      }
    })
  }
}