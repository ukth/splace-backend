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
        const target = await client.photolog.findUnique({ where: { id: targetId } });
        if (!target) {
          return {
            ok: false,
            error: "ERROR2212"
          };
        }
        if(target.authorId == loggedInUser.id){
          return {
            ok: false,
            error: "ERROR1211"
          }
        }
        await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            hiddenPhotologs: {
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
        console.log(e);
        return {
          ok: false,
          error: "ERROR4216",
        };
      }
    }),
  },
};