import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getRoomMessages: protectedResolver(async (_, { chatroomId, lastId }, { loggedInUser }) => {
      try {
        const ok = await client.chatroomElement.findFirst({
          where: {
            chatroomId,
            userId: loggedInUser.id
          }
        })
        if(!ok){
          return {
            ok: false,
            error: "not in chatroom"
          }
        }
        const messages = await client.message.findMany({
          where: {
            chatroom: {
              id: chatroomId
            },
          },
          take: 50,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
          include:{
            author: true,
          }
        })
        return {
          ok: true,
          id: chatroomId,
          messages: messages
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M16"
        }
      }
    }),
  },
};