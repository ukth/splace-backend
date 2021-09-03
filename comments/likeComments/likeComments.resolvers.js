import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    likeComments: protectedResolver(async (
      _,
      { commentId },
      { loggedInUser }
    ) => {
      /*const isLiked = await client.comment.findUnique({ where: { commentId } })
      .likedUsers({
        where: { userId: loggedInUser.userId }
      })
      if(isLiked.length == 1){
        return {
          ok: false,
          error: "you already liked this comment"
        }
      }*/
      try {
        const a = await client.user.update({
          where: {
            userId: loggedInUser.userId
          },
          data: {
            likedComments: {
              connect: {
                commentId
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
          error: "cant like",
        };
      }
    }),
  }
};
