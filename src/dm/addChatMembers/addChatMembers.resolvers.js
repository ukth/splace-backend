import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addChatMembers: protectedResolver(async (_, { memberIds, chatroomId }, { loggedInUser }) => {
      try {
        const ok = await client.chatroom.findFirst({ 
          where: { 
            id: chatroomId,
            members: {
              some: {
                id: loggedInUser.id
              }
            }
          },
          include: {
            members: true
          }
        })
        //console.log(ok)
        if (!ok) {
          return {
            ok: false,
            error: "you dont have authentication to add member."
          };
        }
        for(var i = 0; i < memberIds.length; i++){
          for(var j = 0; j<ok.members.length; j++){
            if(memberIds[i] == ok.members[j].id){
              return {
                ok: false,
                error: "he/she is already in chatroom"
              }
            }
          }
        }

        for (var i = 0; i < memberIds.length; i++) {
          const b = await client.chatroomReaded.create({
            data: {
              user: {
                connect: {
                  id: memberIds[i]
                }
              },
              chatroom: {
                connect: {
                  id: chatroomId
                }
              }
            }
          })
        }
        
        await client.chatroom.update({
          where: {
            id: chatroomId
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