import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    unlikeComments: protectedResolver(async (
      _,
      { commentId },
      { loggedInUser }
    ) => {
      /*const isLiked = await client.comment.findUnique({ where: { commentId } })
      .likedUsers({
        where: { userId: loggedInUser.userId }
      })
      if(isLiked.length == 0){
        return {
          ok: false,
          error: "you already unliked this comment"
        }
      }*/
      try {
        const a = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            likedComments: {
              disconnect: {
                id: commentId
              }
            }
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant unlike",
        };
      }
    }),
  }
};
