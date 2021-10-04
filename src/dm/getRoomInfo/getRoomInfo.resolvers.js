import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getRoomInfo: protectedResolver(async (_, { chatroomId }, { loggedInUser }) => {
      try {
        const room = await client.chatroom.findFirst({
          where: {
            members: {
              some: {
                id: loggedInUser.id,
              },
            },
            id: chatroomId
          },
          include: {
            members: true,
          }
        });
        if(room){
          return {
            ok: true,
            room,
          }
        } else {
          return {
            ok: false,
            error: "you're not in the room",
          }
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant get rooms"
        }
      }
    }),
  },
};