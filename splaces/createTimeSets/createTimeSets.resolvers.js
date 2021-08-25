import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default {
  Mutation: {
    createTimeSets: protectedResolver(async (
      _,
      { open, close, day, splaceId },
      { loggedInUser }
    ) => {
      try {
        console.log(open)
        console.log(dayjs(open,'HH:mm').utc())
        console.log(dayjs(open,'HH:mm').toISOString())
        const a = await client.timeSet.create({
          data: {      
            open:dayjs(open,'HH:mm').toISOString(),
            close:dayjs(close,'HH:mm').toISOString(),
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
