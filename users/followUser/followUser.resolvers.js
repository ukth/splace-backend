import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userId }, { loggedInUser }) => {
      const target = await client.user.findUnique({ where: { userId: userId } });
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
        data:{
          followings: {
            connect: {
              userId
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