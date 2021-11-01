import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createContents: protectedResolver(async (
      _,
      { title, splaceId, text, imageUrls, photoSize },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findFirst({ where: { id: splaceId, activate: true, } });
        if (previous.ownerId != loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        const a = await client.fixedContent.create({
          data: {
            title,
            splace: {
              connect: {
                id: splaceId
              }
            },
            text,
            photoSize,
            imageUrls
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
          error: "ERROR4471",
        };
      }
    }),
  }
};
