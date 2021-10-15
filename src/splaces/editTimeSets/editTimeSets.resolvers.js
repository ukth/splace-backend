import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

async function updateTime(splaceId, day, times) {
  try {
    const b = await client.timeSet.findFirst({
      where: {
        splaceId,
        day
      }
    })
    times = times.sort()

    var openT = null
    var closeT = null
    var breakOpenT = null
    var breakCloseT = null

    if (times.length == 2) {
      openT = times[0] / 60 + ":" + times[0] % 60
      closeT = times[1] / 60 + ":" + times[1] % 60
    }
    if (times.length == 2) {
      openT = times[0] / 60 + ":" + times[0] % 60
      closeT = times[1] / 60 + ":" + times[1] % 60
      breakOpenT = times[2] / 60 + ":" + times[2] % 60
      breakCloseT = times[3] / 60 + ":" + times[3] % 60
    }

    const a = await client.timeSet.update({
      where: {
        id: b.id
      },
      data: {
        day,
        ...(openT && { open: dayjs.utc(openT, 'HH:mm').toISOString() }),
        ...(closeT && { close: dayjs.utc(closeT, 'HH:mm').toISOString() }),
        ...(breakOpenT && { breakOpen: dayjs.utc(breakOpenT, 'HH:mm').toISOString() }),
        ...(breakCloseT && { breakClose: dayjs.utc(breakCloseT, 'HH:mm').toISOString() }),
      },
    });
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export default {
  Mutation: {
    editTimeSets: protectedResolver(async (
      _,
      { splaceId, mon, tue, wed, thr, fri, sat, sun, breakDays, holidayBreak },
      { loggedInUser }
    ) => {
      try {

        const week = [mon, tue, wed, thr, fri, sat, sun]

        for (var i = 0; i++; i < 7) {
          const a = await updateTime(splaceId, i, week[i])
          if(!a){
            return {
              ok: false,
              error: "ERROR4452"
            }
          }
        }

        const b = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            breakDays,
            holidayBreak
          }
        })

        
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
