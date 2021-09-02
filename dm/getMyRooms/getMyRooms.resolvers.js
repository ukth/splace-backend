import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getMyRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const rooms = await client.chatroom.findMany({
          where: {
            members: {
              some: {
                userId: loggedInUser.userId,
              },
            },
          },
          include: {
            members: true,
          }
        })
        return {
          ok: true,
          rooms: rooms
        }
      } catch (e) {
        return {
          ok: false,
          error: "cant get rooms"
        }
      }
    }),
  },
};