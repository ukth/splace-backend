import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addSaves: protectedResolver(async (
      _,
      { splaceIds, folderId },
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
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5B82"
          };
        }
        var newIds = new Array();
        for (var i = 0; i < splaceIds.length; i++) {
          const splaceId = splaceIds[i];
          const exist = await client.save.findFirst({
            where: {
              splaceId,
              folderId
            }
          })
          if (!exist) {
            newIds.push(splaceId);
          }
        }


        const a = await client.save.createMany({
          data:
            newIds.map(splaceId => ({
              splaceId,
              folderId,
              userId: loggedInUser.id
            }))
        });

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

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B82",
        };
      }
    }),
  }
};
