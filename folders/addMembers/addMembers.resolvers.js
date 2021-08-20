import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addMembers: protectedResolver(async (_, { memberIds, folderId }, { loggedInUser }) => {
      const ok = await client.folder.findUnique({ where: { folderId } })
      .members({
        where: { userId: loggedInUser.userId }
      });
      if (!ok) {
        return {
          ok: false,
          error: "you dont have authentication to edit member."
        };
      }
      await client.folder.update({
        where: {
          folderId
        },
        data: {
          members: {
            connect: memberIds.map(memberId => ({
              userId: memberId
            }))
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