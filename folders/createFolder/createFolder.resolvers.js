import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createFolder: protectedResolver(async (
      _,
      { title },
      { loggedInUser }
    ) => {
      try {
        const a = await client.folder.create({
          data: {
            title,
            members: {
              connect: {
                userId: loggedInUser.userId
              }
            },
          },
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant create folder",
        };
      }
    }),
  }
};