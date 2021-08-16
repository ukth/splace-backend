import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      if (targetId === loggedInUser.userId) {
        return {
          ok: false,
          error: "You can't follow yourself"
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
          followings: {
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
    }),
  },
};