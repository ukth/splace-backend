import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getRoomMessages: protectedResolver(async (_, { chatroomId, lastId }, { loggedInUser }) => {
      try {
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
          error: "cant get messages"
        }
      }
    }),
  },
};