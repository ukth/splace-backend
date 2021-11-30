import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { CHATROOM_UPDATE } from "../../constants"
import pubsub from "../../pubsub";

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
            error: "ERROR5M11"
          };
        }

        if(ok.isPersonal){
          return {
            ok: false,
            error: "ERROR1M11"
          }
        }

        const myfollowers = loggedInUser.followers.map(follower => follower.id)
        //console.log(myfollowings);
        for(var i = 0; i<memberIds.length; i++){
          if(!myfollowers.includes(memberIds[i]) && memberIds[i] !== loggedInUser.id){
            return {
              ok: false,
              error: "ERROR1M12"
            }
          }
        }

        for(var i = 0; i < memberIds.length; i++){
          for(var j = 0; j<ok.members.length; j++){
            if(memberIds[i] == ok.members[j].id){
              return {
                ok: false,
                error: "ERROR1M13"
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
        
        const a = await client.chatroom.update({
          where: {
            id: chatroomId
          },
          data: {
            members: {
              connect: memberIds.map(memberId => ({
                id: memberId
              }))
            }
          },
          include: {
            members: true,
            lastMessage: true,
          }
        });

        pubsub.publish(CHATROOM_UPDATE, { chatroomUpdated: { ...a } })

        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M11",
        };
      }
    }),
  },
};