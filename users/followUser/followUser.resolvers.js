import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      const isFollowing = await client.user.findUnique({ where: { userId: loggedInUser.userId } })
        .followings({
          where: { userId: targetId }
        })
      console.log(isFollowing)
      if (isFollowing.length == 1) {
        return {
          ok: false,
          error: "you already follow this user"
        }
      }
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
      try {
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