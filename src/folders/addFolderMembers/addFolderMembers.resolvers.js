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

        let isFollowing;
        for(var i = 0; i<memberIds.length; i++){
          isFollowing = await client.followLog.findFirst({
            where: {
              targetId: loggedInUser.id,
              requestUserId: memberIds[i]
            }
          })
          if(!isFollowing && memberIds[i] !== loggedInUser.id){
            return {
              ok: false,
              error: "ERROR1B11"
            }
          }
        }

        if(!ok) {
          return {
            ok: false,
            error: "ERROR5B11"
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
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B11",
        };
      }
    }),
  },
};