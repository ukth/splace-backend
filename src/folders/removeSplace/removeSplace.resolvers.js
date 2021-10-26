import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    removeSave: protectedResolver(async (
      _,
      { splaceId },
      { loggedInUser }
    ) => {
      try { 
        const a = await client.save.deleteMany({
          where: {
            splaceId,
            savedUser: {
              id: loggedInUser.id
            }
          }
        });
        
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B83",
        };
      }
    }),
  }
};
