import client from "../../client";

export default {
  Mutation: {
    deleteComment: async (
      _,
      { commentId }
    ) => {
      try {
        const a = await client.comment.delete({
          where: {
            commentId
          }
        });
        console.log(a);
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
    },
  },
};