import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(customParseFormat);
dayjs.extend(utc);

function toTime(time) {
  var hours = Math.floor(time / 60);
  var minutes = Math.floor(time % 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  return hours + ':' + minutes;
}

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
    if (times.length != 0 && (times[0] < 0 || times[times.length - 1] > 1440)) {
      return false
    }

    const openT = times.length >= 2 ? dayjs.utc(toTime(times[0]), 'HH:mm').toISOString() : null
    const closeT = times.length >= 2 ? dayjs.utc(toTime(times[times.length-1]), 'HH:mm').toISOString() : null
    const breakOpenT = times.length == 4 ? dayjs.utc(toTime(times[1]), 'HH:mm').toISOString() : null
    const breakCloseT = times.length == 4 ? dayjs.utc(toTime(times[2]), 'HH:mm').toISOString() : null
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
            ownerId: loggedInUser.id,
            activate: true,
          }
        })
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5471"
          }
        }
        const week = [mon, tue, wed, thr, fri, sat, sun]

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
