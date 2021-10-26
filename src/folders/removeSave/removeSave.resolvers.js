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
          },
          include: {
            members: true,
          } 
        })
        if(!ok) {
          return {
            ok: false,
            error: "ERROR5B83"
          };
        }
        const a = await client.save.delete({
          where: {
            id: saveId
          }
        });
        
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B83",
        };
      }
    }),
  }
};
