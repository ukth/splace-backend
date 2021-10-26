import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    quitFolder: protectedResolver(async (_, { folderId }, { loggedInUser }) => {
      try {
        await client.folder.update({
          where: {
            id: folderId
          },
          data: {
            members: {
              disconnect: {
                id: loggedInUser.id
              }
            },
          }
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B18",
        };
      }
    }),
  },
};