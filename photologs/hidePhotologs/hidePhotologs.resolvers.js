import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    hidePhotologs: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
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
        const target = await client.photolog.findUnique({ where: { photologId: targetId } });
        if (!target) {
          return {
            ok: false,
            error: "That photolog does not exist."
          };
        }
        if(target.authorId == loggedInUser.userId){
          return {
            ok: false,
            error: "you cant hide your photologs"
          }
        }
        await client.user.update({
          where: {
            userId: loggedInUser.userId
          },
          data: {
            hiddenPhotologs: {
              connect: {
                photologId: targetId
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
          error: "cant hide photologs",
        };
      }
    }),
  },
};