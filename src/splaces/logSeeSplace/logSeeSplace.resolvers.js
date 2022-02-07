import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logSeeSplace: protectedResolver(async (_, { splaceId }, { loggedInUser }) => {
      try {
        const time = new Date().toISOString().slice(0, 23)
        const table = dataset.table('likeLog')
        const rows = [
          {
            targetId: log.targetId,
            requestUserId: log.requestUserId,
            createdAt: time 
          }
        ]
        const likeLog = await table.insert(rows)
        //console.log(splace)
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4B14"
        };
      }
    })
  }
}