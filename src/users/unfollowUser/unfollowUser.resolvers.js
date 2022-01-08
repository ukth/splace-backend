import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        const ok = await client.followLog.findFirst({
          where: {
            targetId,
            requestUserId: loggedInUser.id
          }
        })
        if(!ok){
          return {
            ok: false,
            error: "followlog X exist"
          }
        }
        const a  = await client.followLog.delete({
          where: {
            id: ok.id
          }
        })
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4118",
        };
      }
    }),
  },
};