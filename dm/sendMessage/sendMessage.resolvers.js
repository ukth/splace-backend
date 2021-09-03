import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { chatroomId, text }, { loggedInUser }) => {
      try {
        const ok = await client.chatroom.findFirst({ 
          where: { 
            id: chatroomId,
            members: {
              some: {
                userId: loggedInUser.userId
              }
            } 
          } 
        })
        //console.log(ok)
        if (!ok) {
          return {
            ok: false,
            error: "you dont have authentication to send message."
          };
        }
        const unreadMembers = await client.user.findMany({ where: { chatrooms: {some: { chatroomId } } } });
        const unreadCount = unreadMembers.length
        const sendedMessage = await client.message.create({
          data: {
            text,
            author: {
              connect: {
                userId: loggedInUser.userId
              }
            },
            chatroom: {
              connect: {
                id: chatroomId
              }
            },
            unreadCount
          },
          include: {
            author: true,
          },
        });
        // console.log(client);
        pubsub.publish(NEW_MESSAGE, { newMessage: { ...sendedMessage } });
        return {
          ok: true,
          message: sendedMessage
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant send message",
        };
      }
    }),
  },
};