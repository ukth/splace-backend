import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unscrapSeries: protectedResolver(async (
      _,
      { scrapedSeriesId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.scrapedSeries.findFirst({
          where:{
            id: scrapedSeriesId,
            savedUser: {
              id: loggedInUser.id
            }
          }
        })
        //console.log(ok);
        if(!ok){
          return {
            ok: false,
            error: "ERROR1131"
          }
        }
        const a = await client.scrapedSeries.delete({
          where:{
           id: scrapedSeriesId 
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
          error: "ERROR4133",
        };
      }
    }),
  }
};
