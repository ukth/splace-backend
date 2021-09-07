import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    scrapLog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.scrap.findFirst({
          where:{
            photologId,
            savedUser: {
              id: loggedInUser.id
            }
          }
        })
        if(ok){
          return{
            ok: false,
            error: "you already scrap this log"
          }
        }
        const a = await client.scrap.create({
          data: {
            photolog: {
              connect: {
                id: photologId
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
        //console.log(e);
        return {
          ok: false,
          error: "cant scrap photolog",
        };
      }
    }),
  }
};
