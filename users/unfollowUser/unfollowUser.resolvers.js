import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      /*const isFollowing = await client.user.findUnique({ where: { userId: loggedInUser.userId } })
        .followings({
          where: { userId: targetId }
        })
      console.log(isFollowing)
      if (isFollowing.length == 0) {
        return {
          ok: false,
          error: "this user is not your following"
        }
      }*/
      try {
        const target = await client.user.findUnique({ where: { userId: targetId } });
        if (targetId === loggedInUser.userId) {
          return {
            ok: false,
            error: "You can't unfollow yourself"
          }
        }
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
            followings: {
              disconnect: {
                userId: targetId
              }
            }
          }
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant unfollow user",
        };
      }
    }),
  },
};