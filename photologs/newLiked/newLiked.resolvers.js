import { NEW_LIKED } from "../../constants";
import pubsub from '../pubsub';
import { withFilter } from "apollo-server";
import client from "../../client";

export default {
  Subscription: {
    newLiked: {
      subscribe: async (_, __, { loggedInUser }, info) => {
        /*const ok = await client.chatroom.findFirst({ 
          where: { 
            id: chatroomId,
            members: {
              some: {
                id: loggedInUser.id
              }
            } 
          } 
        })
        //console.log(ok)
        if (!ok) {
          throw new Error("membership error");
        }*/
        return withFilter(
          () => pubsub.asyncIterator(NEW_LIKED),
          ({ newLiked }, __) => {
            return newLiked.photolog.authorId == loggedInUser.id
          }
        )(_, __, { loggedInUser }, info);
      },
    },
  },
};

