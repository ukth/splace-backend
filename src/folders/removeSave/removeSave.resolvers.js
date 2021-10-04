import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import pubsub from "../../pubsub";
import { FOLDER_UPDATE } from "../../constants";

export default {
  Mutation: {
    removeSave: protectedResolver(async (
      _,
      { saveId, folderId },
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
          include: {
            members: true,
          } 
        })
        //console.log(ok);
        if(!ok) {
          return {
            ok: false,
            error: "you dont have authentication to remove save."
          };
        }
        const a = await client.save.delete({
          where: {
            id: saveId
          }
        });
        //console.log(a);
        pubsub.publish(FOLDER_UPDATE, { folderUpdated: { folder: ok, user: loggedInUser, state: "removed" } });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant remove save",
        };
      }
    }),
  }
};
