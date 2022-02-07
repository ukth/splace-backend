import { CHATROOM_UPDATE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "apollo-server";

export default {
  Subscription: {
    chatroomUpdated: {
      subscribe: async (_, __, { loggedInUser }, info) => {
        return withFilter(
          () => pubsub.asyncIterator(CHATROOM_UPDATE),
          ({ chatroomUpdated }, __) => {
            for(var i = 0; i < chatroomUpdated.members.length; i++){
              if(chatroomUpdated.members[i].userId == loggedInUser.id){
                return true
              }
            }
            return false;
          }
        )(_, __, { loggedInUser }, info);
      },
    },
  },
};

