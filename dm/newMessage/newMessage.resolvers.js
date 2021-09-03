import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "apollo-server";
import client from "../../client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, { chatroomId }, { loggedInUser }, info) => {
        const ok = await client.chatroom.findFirst({ 
          where: { 
            chatroomId,
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
            error: "you are not a member."
          };
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ newMessage }, { chatroomId }) => {
            return newMessage.chatroomId === chatroomId;
          }
        )(_, { chatroomId }, { loggedInUser }, info);
      },
    },
  },
};

