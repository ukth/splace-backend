import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getRoomInfo: protectedResolver(async (_, { chatroomId }, { loggedInUser }) => {
      try {
        const ok = await client.chatroomElement.findFirst({
          where: {
            chatroomId,
            userId: loggedInUser.id
          }
        })
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5M13",
          }
        }
        const room = await client.chatroom.findUnique({
          where: {
            id: chatroomId
          },
          include: {
            members: true,
          }
        });

        return {
          ok: true,
          room,
        }

      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M15"
        }
      }
    }),
  },
};