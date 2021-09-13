import { CHATROOM_UPDATE } from "../../constants";
import pubsub from "../../pubsub";
import { withFilter } from "apollo-server";
import client from "../../client";

export default {
  Subscription: {
    chatroomUpdated: {
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
          () => pubsub.asyncIterator(CHATROOM_UPDATE),
          ({ chatroomUpdated }, __) => {
            for(var i = 0; i < chatroomUpdated.members.length; i++){
              if(chatroomUpdated.members[i].id == loggedInUser.id){
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

