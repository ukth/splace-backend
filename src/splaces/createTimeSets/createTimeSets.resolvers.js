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
      { open, close, day, splaceId, isBreakTime },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.timeSet.findFirst({
          where: {
            day,
            splace: {
              id: splaceId
            },
            isBreakTime
          },
        })
        if(ok){
          return {
            ok: false,
            error: "ERROR3441"
          }
        }
        const otime = open.split(':');
        const ctime = close.split(':');
        if(day<0 || day > 6 || Number(otime[0])>=Number(ctime[0]) && Number(otime[1])>=Number(ctime[1])){
          return{
            ok: false,
            error: "ERROR1441"
          }
        }
        const b = await client.timeSet.create({
          data: {      
            open:dayjs.utc(open,'HH:mm').toISOString(),
            close:dayjs.utc(close,'HH:mm').toISOString(),
            day,
            splace: {
              connect: {
                id: splaceId
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
          error: "ERROR4451",
        };
      }
    }),
  }
};
