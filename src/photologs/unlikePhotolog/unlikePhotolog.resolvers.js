import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    unlikePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.likeLog.findFirst({
          where: {
            targetId: photologId,
            requestUserId: loggedInUser.id
          }
        })
        if(!ok){
          return {
            ok: false,
            error: "hadnt liked"
          }
        }
        const a = await client.likeLog.delete({
          where: {
            id: ok.id
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
          error: "ERROR421A",
        };
      }
    }),
  }
};
