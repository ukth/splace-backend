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
        const otime = open.split(':');
        const ctime = close.split(':');
        if(day<0 || day > 6 || Number(otime[0])>=Number(ctime[0]) && Number(otime[1])>=Number(ctime[1])){
          return{
            ok: false,
            error: "ERROR1441"
          }
        }
        const a = await client.timeSet.update({
          where: {
            id: timeSetId
          },
          data: {
            open:dayjs.utc(open,'HH:mm').toISOString(),
            close:dayjs.utc(close,'HH:mm').toISOString(),
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
          error: "ERROR4452",
        };
      }
    }),
  }
};
