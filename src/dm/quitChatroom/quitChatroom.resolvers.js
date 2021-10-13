import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    quitChatroom: protectedResolver(async (_, { chatroomId }, { loggedInUser }) => {
      /*const ok = await client.folder.findUnique({ where: { folderId } })
        .members({
          where: { userId: loggedInUser.userId }
        });
      if (!ok) {
        return {
          ok: false,
          error: "you are not member."
        };
      }*/
      try {
        const ok = await client.chatroomReaded.findFirst({
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
        await client.chatroom.update({
          where: {
            id: chatroomId
          },
          data: {
            members: {
              disconnect: {
                id: loggedInUser.id
              }
            },
          }
        });
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