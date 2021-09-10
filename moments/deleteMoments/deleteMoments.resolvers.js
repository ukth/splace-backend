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
            error: "you can only delete yours"
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
        //console.log(e);
        return {
          ok: false,
          error: "cant delete photolog",
        };
      }
    }),
  },
};