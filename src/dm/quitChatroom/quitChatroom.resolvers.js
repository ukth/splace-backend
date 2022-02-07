import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    quitChatroom: protectedResolver(async (_, { chatroomId }, { loggedInUser }) => {
      try {
        const ok = await client.chatroomElement.findFirst({
          where: {
            user: {
              id: loggedInUser.id
            },
            chatroom: {
              id: chatroomId
            }
          }
        })
        if(!ok){
          return {
            ok: false,
            error: "ERROR5M14"
          }
        }
        await client.chatroomReaded.delete({
          where: {
            id: ok.id
          }
        })
        
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M17",
        };
      }
    }),
  },
};