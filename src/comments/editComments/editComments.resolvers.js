import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComments: protectedResolver(async (
      _,
      { commentId, text },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.comment.findUnique({ where: { id: commentId } });
        if (previous.authorId != loggedInUser.id) {
          return {
            ok: false,
            error: "you can edit only yours!"
          };
        }
        const a = await client.comment.update({
          where: {
            id: commentId
          },
          data: {
            text
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant edit comment",
        };
      }
    }),
  }
};
