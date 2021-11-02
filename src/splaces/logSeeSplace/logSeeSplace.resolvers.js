import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logSeeSplace: protectedResolver(async (_, { splaceId }, { loggedInUser }) => {
      try {
        const logging= await client.seeSplaceLog.create({
          data: {
            userId: loggedInUser.id,
            splaceId: splaceId
          }
        })
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