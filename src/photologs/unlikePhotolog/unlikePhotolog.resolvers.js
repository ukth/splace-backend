import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    unlikePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            likedPhotologs: {
              disconnect: {
                id: photologId
              }
            }
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
          error: "ERROR421A",
        };
      }
    }),
  }
};
