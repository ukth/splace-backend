import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createSplaces: protectedResolver(async (
      _,
      { name },
      { loggedInUser }
    ) => {
      if(loggedInUser.authority !== "root"){
        return {
          ok: false,
          error: "only root user can create splace"
        }
      }
      try {
        const a = await client.splace.create({
          data: {
            name,
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant create splace",
        };
      }
    }),
  }
};
