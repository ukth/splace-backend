import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logGetLogsBySplace: protectedResolver(async (_, { splaceId }, { loggedInUser }) => {
      try {
        const logging= await client.seeSplaceLog.create({
          data: {
            userId: loggedInUser.id,
            splaceId: splaceId
          }
        })
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