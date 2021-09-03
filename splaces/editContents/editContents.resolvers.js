import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editContents: protectedResolver(async (
      _,
      { title, imageUrl, text, splaceId, fixedContentId },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({ where: { splaceId } });
        if (previous.ownerId != loggedInUser.userId) {
          return {
            ok: false,
            error: "you are not the owner of this splace!"
          };
        }
        const a = await client.fixedContent.update({
          where: { fixedContentId },
          data: {
            title,
            imageUrl,
            text,
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
          error: "cant create fixedContents",
        };
      }
    }),
  }
};
