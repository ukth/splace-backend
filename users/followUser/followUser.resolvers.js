import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userId }, { loggedInUser }) => {
      const target = await client.user.findUnique({ where: { user_id: userId } });
      if (!target) {
        return {
          ok: false,
          error: "That user does not exist."
        };
      }
      await client.followings.create({
        data: {
          user_id: loggedInUser.user_id,
          target_id: target.user_id
        },
      });
      return {
        ok: true,
      };
    }),
  },
};