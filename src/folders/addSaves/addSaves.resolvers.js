import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import pubsub from "../../pubsub";
import { FOLDER_UPDATE } from "../../constants";

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

        //console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "you dont have authentication to add save."
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

        //console.log(a);

        pubsub.publish(FOLDER_UPDATE, { folderUpdated: { folder: ok, user: loggedInUser, state: "added" } });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant add save",
        };
      }
    }),
  }
};
