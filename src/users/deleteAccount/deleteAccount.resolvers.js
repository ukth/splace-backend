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
        const a = await client.user.delete({
          where: {
            id: loggedInUser.id
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
          error: "cant delete account",
        };
      }
    }),
  },
};