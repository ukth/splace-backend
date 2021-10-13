import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteAccount: protectedResolver(async (
      _,
      __,
      { loggedInUser }
    ) => {
      try {
        const a = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            activate: false
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
          error: "ERROR4102",
        };
      }
    }),
  },
};