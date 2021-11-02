import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logSeePhotolog: protectedResolver(async (_, { photologId }, { loggedInUser }) => {
      try {
        const logging = await client.seePhotologLog.create({
          data: {
            userId: loggedInUser.id,
            photologId
          }
        })

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