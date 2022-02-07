import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logSeePhotolog: protectedResolver(async (_, { photologId }, { loggedInUser }) => {
      try {
        const time = new Date().toISOString().slice(0, 23)
        const table = dataset.table('seePhotologLog')
        const rows = [
          {
            userId: loggedInUser.id,
            photologId: photologId,
            createdAt: time
          }
        ]
        const log = await table.insert(rows)
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant see log"
        };
      }
    })
  }
}