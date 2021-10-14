import client from "../../client";
import { protectedResolver } from "../users.utils";
import pubsub from "../../pubsub";
import { NEW_FOLLOWER } from "../../constants";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        /*const isFollowing = await client.user.findUnique({ where: { id: loggedInUser.id } })
          .followings({
            where: { id: targetId }
          })
        if (isFollowing.length == 1) {
          return {
            ok: false,
            error: "you already follow this user"
          }
        }*/
        if (targetId === loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR1112"
          }
        }
        const target = await client.user.findUnique({ where: { id: targetId } });
        if (!target) {
          return {
            ok: false,
            error: "ERROR2112"
          };
        }
        const targetUser = await client.user.update({
          where: {
            id: targetId
          },
          data: {
            followers: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        });
        pubsub.publish(NEW_FOLLOWER, { newFollower: { followed: targetUser, following: loggedInUser }})
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