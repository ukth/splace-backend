import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editTimeSets: protectedResolver(async (
      _,
      { open, close, timeSetId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.timeSet.update({
          where: {
            timeSetId
          },
          data: {
            open,
            close,
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
