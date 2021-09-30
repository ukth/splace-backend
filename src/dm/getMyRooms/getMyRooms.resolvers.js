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
          take: 10,
            ...(lastId && { cursor: { id: lastId } }),
            skip: lastId ? 1 : 0,
            orderBy: {
              updatedAt: "desc",
          },
          include: {
            members: true,
            lastMessage: true,
            chatroomReaded: {
              include:{
                user: true,
                chatroom: true,
              }
            }
          }
        })
        return {
          ok: true,
          myRooms: rooms,
          id: loggedInUser.id
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