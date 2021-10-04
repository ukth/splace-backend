import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createContents: protectedResolver(async (
      _,
      { title, splaceId },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({ where: { id: splaceId } });
        if (previous.ownerId != loggedInUser.id) {
          return {
            ok: false,
            error: "you are not the owner of this splace!"
          };
        }
        const a = await client.fixedContent.create({
          data: {
            title,
            splace: {
              connect: {
                id: splaceId
              }
            }
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
          error: "cant create fixedContents",
        };
      }
    }),
  }
};
