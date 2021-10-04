import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    scrapSeries: protectedResolver(async (
      _,
      { seriesId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.scrapedSeries.findFirst({
          where:{
            seriesId,
            savedUserId: loggedInUser.id
          }
        })
        if(ok){
          return{
            ok: false,
            error: "you already scrap this log"
          }
        }
        const a = await client.scrapedSeries.create({
          data: {
            series: {
              connect: {
                id: seriesId
              }
            },
            savedUser: {
              connect: {
                id: loggedInUser.id
              }
            },
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
          error: "cant scrap photolog",
        };
      }
    }),
  }
};
