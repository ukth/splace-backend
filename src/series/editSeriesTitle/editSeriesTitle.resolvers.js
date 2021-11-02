import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editSeriesTitle: protectedResolver(async (
      _,
      { seriesId, title },
      { loggedInUser }
    ) => {
      try {
        if(title.length<1 && title.length<31){
          return {
            ok: false,
            error: "ERROR1311"
          }
        }
        const a = await client.series.findFirst({
          where: {
            id: seriesId,
            author: {
              id: loggedInUser.id
            }
          }
        });
        if(!a){
          return{
            ok: false,
            error: "ERROR5312"
          }
        }
        const b = await client.series.update({
          where:{
            id: seriesId
          },
          data: {
            title
          }
        })
        //console.log(b)
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4312",
        };
      }
    }),
  },
};