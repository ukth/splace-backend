import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createSplaceRating: protectedResolver(async (
      _,
      { splaceId, rating },
      { loggedInUser }
    ) => {
      try {
        const a = await client.splaceRating.create({
          data: {
            splaceId,
            userId: loggedInUser.id,
            rating,
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
          error: "ERROR4471",
        };
      }
    }),
  }
};
