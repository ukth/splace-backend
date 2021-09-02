import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getRoomMessages: protectedResolver(async (_, { chatroomId, lastId }, { loggedInUser }) => {
      try {
        const messages = await client.message.findMany({
          where: {
            chatroom: {
              chatroomId
            },
          },
          take: 50,
          ...(lastId && { cursor: { messageId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          messages: messages
        }
      } catch (e) {
        return {
          ok: false,
          error: "cant get messages"
        }
      }
    }),
  },
};