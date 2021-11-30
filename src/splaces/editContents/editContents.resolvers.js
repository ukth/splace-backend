import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editContents: protectedResolver(async (
      _,
      { title, text, fixedContentId, splaceId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
            owner: {
              id: loggedInUser.id
            },
            activate: true,
          },
        });
        if (!ok) {
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
