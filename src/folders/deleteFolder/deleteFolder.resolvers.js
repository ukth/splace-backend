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
        if(!ok) {
          return {
            ok: false,
            error: "ERROR5B13"
          };
        }
        const b = await client.save.deleteMany({
          where: {
            folderId
          }
        })
        const a = await client.folder.delete({
          where: {
            id: folderId
          }
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B14",
        };
      }
    }),
  },
};