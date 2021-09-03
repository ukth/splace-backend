import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    blockUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        /*const isFollowing = await client.user.findUnique({ where: { userId: loggedInUser.userId } })
          .followings({
            where: { userId: targetId }
          })
        if (isFollowing.length == 1) {
          return {
            ok: false,
            error: "you already follow this user"
          }
        }*/
        if (targetId === loggedInUser.userId) {
          return {
            ok: false,
            error: "You can't block yourself"
          }
        }
        const target = await client.user.findUnique({ where: { userId: targetId } });
        if (!target) {
          return {
            ok: false,
            error: "That user does not exist."
          };
        }
        await client.user.update({
          where: {
            userId: loggedInUser.userId
          },
          data: {
            blockedUser: {
              connect: {
                userId: targetId
              }
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant block user",
        };
      }
    }),
  },
};