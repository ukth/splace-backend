import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { chatroomId, text }, { loggedInUser }) => {
      try {
        const ok = await client.chatroom.findUnique({ where: { chatroomId } })
          .members({
            where: { userId: loggedInUser.userId }
          });
        if (ok.length == 0) {
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
                chatroomId
              }
            },
            unreadCount
          }
        });
        // console.log(client);
        pubsub.publish(NEW_MESSAGE, { newMessage: { ...sendedMessage } });
        return {
          ok: true,
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