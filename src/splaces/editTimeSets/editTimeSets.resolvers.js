import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

async function updateTime(splaceId, day, times) {
  try {
    const b = await client.timeSet.findFirst({
      where: {
        splaceId,
        day
      }
    })
    times = times.sort(function (a, b) {
      return a - b;
    })

    if(times.length%2){
      return false
    }
    if (times.length != 0 && (times[0] < 0 || times[times.length - 1] > 86400000)) {
      return false
    }

    const openT = times.length >= 2 ? new Date(times[0]).toISOString() : null
    const closeT = times.length >= 2 ? new Date(times[times.length-1]).toISOString() : null
    const breakOpenT = times.length == 4 ? new Date(times[1]).toISOString() : null
    const breakCloseT = times.length == 4 ? new Date(times[2]).toISOString() : null
    //console.log(openT)
    const a = await client.timeSet.update({
      where: {
        id: b.id
      },
      data: {
        day,
        open: openT,
        close: closeT,
        breakOpen: breakOpenT,
        breakClose: breakCloseT
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
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
            activate: true,
          }
        })
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5471"
          }
        }
        if (ok.ownerId != loggedInUser.id && ok.ownerId != null) {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        if (ok.ownerId == null && loggedInUser.authority != "editor") {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        /*var day = new Date()
        var update = new Date(ok.updatedAt)
        if (ok.ownerId == null && day.getTime() - update.getTime() <= 3600000) {
          return {
            ok: false,
            error: "ERROR5473"
          }
        }*/
        const week = [sun, mon, tue, wed, thr, fri, sat]

        for (var i = 0; i < 7; i++) {
          const a = await updateTime(splaceId, i, week[i])
          //console.log(a)
          if (!a) {
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
