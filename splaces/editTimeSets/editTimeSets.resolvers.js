import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

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
            open:dayjs(open,'HH:mm').toISOString(),
            close:dayjs(close,'HH:mm').toISOString(),
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
