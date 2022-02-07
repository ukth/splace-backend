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

        const time = Date.now()
        const table = dataset.table('splaceRating')
        const rows = [
          {
            userId: loggedInUser.id,
            splaceId: splaceId,
            rating: rating,
            createdAt: time
          }
        ]
        const log = await table.insert(rows)
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
