import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        const isFollowing = await client.user.findUnique({ where: { id: loggedInUser.id } })
          .followings({
            where: { id: targetId }
          })
        if (isFollowing.length == 1) {
          return {
            ok: false,
            error: "you already follow this user"
          }
        }
        if (targetId === loggedInUser.id) {
          return {
            ok: false,
            error: "You can't follow yourself"
          }
        }
        const target = await client.user.findUnique({ where: { id: targetId } });
        if (!target) {
          return {
            ok: false,
            error: "That user does not exist."
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            followings: {
              connect: {
                id: targetId
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
          error: "cant follow user",
        };
      }
    }),
  },
};