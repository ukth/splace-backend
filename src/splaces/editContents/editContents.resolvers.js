import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editContents: protectedResolver(async (
      _,
      { title, text, fixedContentId },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({ where: { id: splaceId } });
        if (previous.ownerId != loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        const a = await client.fixedContent.update({
          where: { id: fixedContentId },
          data: {
            title,
            text,
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
          error: "ERROR4472",
        };
      }
    }),
  }
};
