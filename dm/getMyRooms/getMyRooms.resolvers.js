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
                id: loggedInUser.id,
              },
            },
          },
          take: 5,
            ...(lastId && { cursor: { id: lastId } }),
            skip: lastId ? 1 : 0,
            orderBy: {
              updatedAt: "asc",
          },
          include: {
            members: true,
            lastMessage: true,
          }
        })
        return {
          ok: true,
          myRooms: rooms
        }
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant get rooms"
        }
      }
    }),
  },
};