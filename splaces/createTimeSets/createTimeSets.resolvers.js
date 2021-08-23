import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createTimeSets: protectedResolver(async (
      _,
      { open, close, day, splaceId },
      { loggedInUser }
    ) => {
      try {
        let open = new Date(open);
        let close = new Date(close);
        const a = await client.timeSet.create({
          data: {
            open,
            close,
            day,
            splace: {
              connect: {
                splaceId
              }
            }
          },
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant create Timeset",
        };
      }
    }),
  }
};
