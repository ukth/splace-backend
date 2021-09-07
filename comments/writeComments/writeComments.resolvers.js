import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    writeComments: protectedResolver(async (
      _,
      { text, photologId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.comment.create({
          data: {
            author: {
              connect: {
                id: loggedInUser.id
              }
            },
            text,
            photolog: {
              connect: {
                id: photologId
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
          error: "cant create comment",
        };
      }
    }),
  }
};
