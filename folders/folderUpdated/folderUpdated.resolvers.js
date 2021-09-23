import { FOLDER_UPDATE } from "../../constants";
const pubsub = require("../../pubsub");
import { withFilter } from "apollo-server";
import client from "../../client";

export default {
  Subscription: {
    folderUpdated: {
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
          () => pubsub.subscribe(FOLDER_UPDATE),
          ({ folderUpdated }, __) => {
            console.log(folderUpdated)
            for(var i = 0; i < folderUpdated.folder.members.length; i++){
              if(folderUpdated.folder.members[i].id == loggedInUser.id){
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

