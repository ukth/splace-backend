import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
// dayjs.extend(timezone)

export default {
  Mutation: {
    createTimeSets: protectedResolver(async (
      _,
      { open, close, day, splaceId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.timeSet.create({
          data: {      
            open:dayjs.utc(open,'HH:mm').toISOString(),
            close:dayjs.utc(close,'HH:mm').toISOString(),
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
