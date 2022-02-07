import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "apollo-server";
import client from "../../client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, { chatroomId }, { loggedInUser }, info) => {
        const ok = await client.chatroomElement.findFirst({ 
          where: { 
            chatroomId,
            userId: loggedInUser.id 
          } 
        })
        if (!ok) {
          throw new Error("membership error");
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

