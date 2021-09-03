import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (
      _,
      { commentId }
    ) => {
      try {
        const a = await client.comment.delete({
          where: {
            commentId
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant delete comment",
        };
      }
    }),
  },
};