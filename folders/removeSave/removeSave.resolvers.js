import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

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
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant remove save",
        };
      }
    }),
  }
};
