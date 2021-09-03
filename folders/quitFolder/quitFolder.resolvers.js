import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    quitFolder: protectedResolver(async (_, { folderId }, { loggedInUser }) => {
      /*const ok = await client.folder.findUnique({ where: { folderId } })
        .members({
          where: { userId: loggedInUser.userId }
        });
      if (!ok) {
        return {
          ok: false,
          error: "you are not member."
        };
      }*/
      try {
        await client.folder.update({
          where: {
            folderId
          },
          data: {
            members: {
              disconnect: {
                userId: loggedInUser.userId
              }
            },
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant quit folder",
        };
      }
    }),
  },
};