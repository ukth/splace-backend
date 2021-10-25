import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editFolder: protectedResolver(async (
      _,
      { folderId, title },
      { loggedInUser }
    ) => {
      try {

        const ok = await client.folder.findFirst({
          where: {
            id: folderId,
            members: {
              some: {
                id: loggedInUser.id
              }
            }
          },
        })

        const log = await client.editFolderLog.create({
          data: {
            target: {
              connect: {
                id: folderId
              }
            },
            requestUser: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        })
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5B14"
          };
        }

        
        const a = await client.folder.update({
          where: {
            id: folderId
          },
          data: {
            title,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B15",
        };
      }
    }),
  }
};
