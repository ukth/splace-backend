import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (
      _,
      { commentId },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.comment.findUnique({ where: { id: commentId } });
        if (previous.authorId != loggedInUser.id) {
          return {
            ok: false,
            error: "you can delete only yours!"
          };
        }
        const a = await client.comment.delete({
          where: {
            id: commentId
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant delete comment",
        };
      }
    }),
  },
};