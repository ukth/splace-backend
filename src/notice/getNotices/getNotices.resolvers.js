import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    getNotices: protectedResolver(async (_, { sourceType, sourceId, reason }, { loggedInUser }) => {
      try {
        const ok = await client.report.findFirst({
          where: {
            sourceType,
            sourceId,
            userId: loggedInUser.id
          }
        })
        if (ok && sourceType != "problem") {
          return {
            ok: false,
            error: "ERROR3P11"
          };
        }
        const a = await client.report.create({
          data: {
            sourceType,
            sourceId,
            reason,
            reportedUser: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        })
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "can't report"
        };
      }
    })
  }
}