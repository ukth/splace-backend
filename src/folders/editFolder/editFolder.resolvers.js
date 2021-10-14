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

        //console.log(ok);
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
        
        //console.log(a);
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
