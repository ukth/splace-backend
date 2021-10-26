import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { NEW_MESSAGE } from "../../constants";
import { CHATROOM_UPDATE } from "../../constants"
import pubsub from "../../pubsub";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { chatroomId, text }, { loggedInUser }) => {
      try {
        if(text.length < 1 && text.length > 1000){
          return {
            ok: false,
            error: "ERROR1M18"
          }
        }
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
            members: true,
          } 
        })
        
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5M16"
          };
        }
        
        const check = ok.members.filter(member => member.id == 1)
        if(check.length != 0) {
          return {
            ok: false,
            error: "ERROR1M12"
          }
        }
        
        const sendedMessage = await client.message.create({
          data: {
            text,
            author: {
              connect: {
                id: loggedInUser.id
              }
            },
            chatroom: {
              connect: {
                id: chatroomId
              }
            },
          },
          include: {
            author: true,
          },
        });

        const updatedChatroom = await client.chatroom.update({
          where:{
            id: chatroomId
          },
          data: {
            lastMessage: {
              connect: {
                id: sendedMessage.id
              }
            }
          },
          include: {
            members: true,
            lastMessage: true,
          }
        })


        const readedRecord = await client.chatroomReaded.findFirst({
          where: {
            user: {
              id: loggedInUser.id
            },
            chatroom: {
              id: chatroomId
            }
          }
        })
        if(!ok){
          return{
            ok: false,
            error: "ERROR4M19"
          }
        }
        const updatedRecord = await client.chatroomReaded.update({
          where: {
            id: readedRecord.id
          },
          data: {
            user: {
              connect: {
                id: loggedInUser.id
              }
            }
          },
        });

        
        
        pubsub.publish(NEW_MESSAGE, { newMessage: { ...sendedMessage } });
        pubsub.publish(CHATROOM_UPDATE, { chatroomUpdated: { ...updatedChatroom }})
        return {
          ok: true,
          message: sendedMessage,
          readedRecord: updatedRecord
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant send message",
        };
      }
    }),
  },
};