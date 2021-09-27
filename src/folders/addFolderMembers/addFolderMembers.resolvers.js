import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addFolderMembers: protectedResolver(async (_, { memberIds, folderId }, { loggedInUser }) => {
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
            error: "you dont have authentication to edit member."
          };
        }
        await client.folder.update({
          where: {
            id: folderId
          },
          data: {
            members: {
              connect: memberIds.map(memberId => ({
                id: memberId
              }))
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant add member",
        };
      }
    }),
  },
};