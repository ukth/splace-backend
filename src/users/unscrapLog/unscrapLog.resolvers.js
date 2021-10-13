import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unscrapLog: protectedResolver(async (
      _,
      { scrapedLogId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.scrapedLog.findFirst({
          where:{
            id: scrapedLogId,
            savedUser: {
              id: loggedInUser.id
            }
          }
        })
        //console.log(ok);
        if(!ok){
          return {
            ok: false,
            error: "ERROR1121"
          }
        }
        const a = await client.scrapedLog.delete({
          where:{
           id: scrapedLogId 
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
          error: "ERROR4123",
        };
      }
    }),
  }
};
