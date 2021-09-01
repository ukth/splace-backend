import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    getMyRooms: protectedResolver(async (_, __, { loggedInUser }) =>
      client.chatroom.findMany({
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
    ),
  },
};