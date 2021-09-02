import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getMyRooms: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const rooms = await client.chatroom.findMany({
          where: {
            members: {
              some: {
                userId: loggedInUser.userId,
              },
            },
            take: 5,
            ...(lastId && { cursor: { chatroomId: lastId } }),
            skip: lastId ? 1 : 0,
            orderBy: {
              updatedAt: "asc",
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