import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createSplaces: protectedResolver(async (
      _,
      { name, lat, lon, address},
      { loggedInUser }
    ) => {
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
        console.log(e);
        return {
          ok: false,
          error: "ERROR4411",
        };
      }
    }),
  }
};
