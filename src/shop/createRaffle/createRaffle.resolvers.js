import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';

export default {
  Mutation: {
    createRaffle: protectedResolver(async (
      _,
      { name, credit, dDay, imageUrls, splaceId, info },
      { loggedInUser }
    ) => {
      if (loggedInUser.authority !== "root") {
        return {
          ok: false,
          error: "ERROR5K11"
        }
      }
      dDay = dayjs(parseInt(dDay))
      const day = dDay.format()
      //console.log(day)
      try {
        const a = await client.raffle.create({
          data: {
            name,
            credit,
            dDay: day,
            imageUrls,
            ...(splaceId != null && {
              splace: {
                connect: {
                  id: splaceId
                }
              }
            }),
            info
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
          error: "ERROR4K12",
        };
      }
    }),
  }
};
