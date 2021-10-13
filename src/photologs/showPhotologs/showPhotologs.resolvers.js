import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    showPhotologs: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
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
        /*const target = await client.photolog.findUnique({ where: { photologId: targetId } });
        if (target === loggedInUser.userId) {
          return {
            ok: false,
            error: "You can't unblock yourself"
          }
        }
        if (!target) {
          return {
            ok: false,
            error: "That user does not exist."
          };
        }
        if(target.authorId == loggedInUser.userId){
          return {
            ok: false,
            error: "you cant hide your photologs"
          }
        }*/
        await client.photolog.update({
          where: {
            id: targetId
          },
          data: {
            hiddenUsers: {
              disconnect: {
                id: loggedInUser.id
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
          error: "ERROR4219",
        };
      }
    }),
  },
};