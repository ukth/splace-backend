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
        const ok = await client.chatroomElement.findFirst({
          where: {
            chatroomId,
            userId: loggedInUser.id
          }
        })
        
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5M16"
          };
        }
        
        const suuper = await client.chatroomElement.findFirst({
          where: {
            chatroomId,
            userId: 1
          }
        })

        if(suuper != suuper && loggedInUser.id != 1) {
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

        const updatedRecord = await client.chatroomElement.update({
          where: {
            id: ok.id
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