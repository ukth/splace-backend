import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteSplace: protectedResolver(async (
      _,
      { splaceId },
      { loggedInUser }
    ) => {
      try {
        if(loggedInUser.authority !== "root"){
          return {
            ok: false,
            error: "ERROR5412"
          }
        }
        const a = await client.splace.delete({
          where: {
            id: splaceId
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4412",
        };
      }
    }),
  },
};