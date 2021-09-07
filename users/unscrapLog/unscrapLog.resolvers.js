import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unscrapLog: protectedResolver(async (
      _,
      { scrapId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.scrap.findFirst({
          where:{
            id: scrapId,
            savedUser: {
              id: loggedInUser.id
            }
          }
        })
        //console.log(ok);
        if(!ok){
          return {
            ok: false,
            error: "you can only unscrap yours"
          }
        }
        const a = await client.scrap.delete({
          where:{
           id: scrapId 
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant unscrap photolog",
        };
      }
    }),
  }
};
