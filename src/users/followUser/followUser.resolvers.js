import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        if (targetId === loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR1112"
          }
        }
        const target = await client.user.findFirst({ 
          where: { 
            id: targetId ,
            activate: true
          } 
        });
        if (!target) {
          return {
            ok: false,
            error: "ERROR2112"
          };
        }
        const ok = await client.followLog.findFirst({
          where: {
            targetId: targetId,
            requestUserId: loggedInUser.id
          }
        })

        if(ok){
          return {
            ok: false,
            error: "already followed"
          }
        }
        const a = await client.followLog.create({
          data: {
            target: {
              connect: {
                id: targetId
              }
            },
            requestUser: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        })

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant follow user",
        };
      }
    }),
  },
};