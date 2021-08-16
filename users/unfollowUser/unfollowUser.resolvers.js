import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
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
              targetId
            }
          }
        }
      });
      return {
        ok: true,
      };
    }),
  },
};