import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteMoments: protectedResolver(async (
      _,
      { momentsId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.moment.findFirst({
          where: {
            id: momentsId,
            author: {
              id: loggedInUser.id
            }
          }
        });
        if(!a){
          return{
            ok: false,
            error: "ERROR5O11"
          }
        }
        const b = await client.moment.delete({
          where: {
            id: momentsId,
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4O13",
        };
      }
    }),
  },
};