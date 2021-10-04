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

        const myfollowings = loggedInUser.followings.map(following => following.id)
        //console.log(myfollowings);
        for(var i = 0; i<memberIds.length; i++){
          if(!myfollowings.includes(memberIds[i]) && memberIds[i] !== loggedInUser.id){
            return {
              ok: false,
              error: "invalid member included"
            }
          }
        }

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
        console.log(e);
        return {
          ok: false,
          error: "cant add member",
        };
      }
    }),
  },
};