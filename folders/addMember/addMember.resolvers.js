import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addMember: protectedResolver(async (_, { targetId, folderId }, { loggedInUser }) => {
      const ok = await client.folder.findUnique({ where: { folderId } })
      .members({
        where: { userId: loggedInUser.userId }
      });
      if (!ok) {
        return {
          ok: false,
          error: "you dont have authentication for adding member."
        };
      }
      await client.folder.update({
        where: {
          folderId
        },
        data: {
          members: {
            connect: {
              userId: targetId
            }
          }
        }
      });
      // console.log(client);
      return {
        ok: true,
      };
    }),
  },
};