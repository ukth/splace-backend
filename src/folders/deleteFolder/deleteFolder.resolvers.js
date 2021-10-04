import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteFolder: protectedResolver(async (
      _,
      { folderId },
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
          } 
        })
        //console.log(ok);
        if(!ok) {
          return {
            ok: false,
            error: "you dont have authentication to delete folder."
          };
        }
        const a = await client.folder.delete({
          where: {
            id: folderId
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant delete folder",
        };
      }
    }),
  },
};