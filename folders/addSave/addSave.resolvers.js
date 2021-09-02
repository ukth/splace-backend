import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addSave: protectedResolver(async (
      _,
      { splaceId, folderId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.folder.findUnique({ 
          where: { 
            folderId,
            members: {
              some: {
                userId: loggedInUser.userId
              }
            } 
          } 
        })
        console.log(ok);
        if(!ok) {
          return {
            ok: false,
            error: "you dont have authentication to add save."
          };
        }
        const a = await client.save.create({
          data: {
            splace: {
              connect: {
                splaceId
              }
            },
            folder: {
              connect: {
                folderId
              }
            },
          },
        });
        console.log(a);
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
