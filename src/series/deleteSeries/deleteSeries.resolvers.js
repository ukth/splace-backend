import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteSeries: protectedResolver(async (
      _,
      { seriesId },
      { loggedInUser }
    ) => {
      try {
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
        const c = await client.seriesElement.deleteMany({
          where: {
            seriesId
          }
        })
        const b = await client.series.delete({
          where:{
            id: seriesId
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