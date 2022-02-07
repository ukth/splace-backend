import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logGetSplacesByRatingtag: protectedResolver(async (_, { tagId }, { loggedInUser }) => {
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