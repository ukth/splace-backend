import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addPhotologs: protectedResolver(async (_, { photologIds, seriesId }, { loggedInUser }) => {
      try {
        const ok = await client.series.findFirst({ 
          where: { 
            id: seriesId,
            author: {
              id: loggedInUser.id
            } 
          } 
        })
        //console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5311"
          };
        }
        if (!ok.isPrivate){
          for(var i=0; i<photologIds.length; i++){
            const a = await client.photolog.findUnique({
              where: {
                id: photologIds[i]
              }
            })
            if(a.isPrivate){
              return {
                ok: false,
                error: "ERROR1321"
              }
            }
          }
        }
        await client.series.update({
          where: {
            id: seriesId
          },
          data: {
            photologs: {
              connect: photologIds.map(photologId => ({
                id: photologId
              }))
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4321",
        };
      }
    }),
  },
};