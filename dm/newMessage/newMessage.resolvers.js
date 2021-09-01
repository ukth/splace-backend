import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "apollo-server";
import client from "../../client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, { chatroomId }, { loggedInUser }, info) => {
        const ok = await client.chatroom.findUnique({ where: { chatroomId } })
          .members({
            where: { userId: loggedInUser.userId }
          });
        console.log(ok);
        if (ok.length == 0) {
          throw new error("you are not member.")
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

