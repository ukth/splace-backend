import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyBlockingUser: protectedResolver(async (_, { }, { loggedInUser }) => {
      try {
        const users = await client.user.findMany({
          where: {
            blockingUser: {
              some: {
                id: loggedInUser.id,
                activate: true
              },
            }
          },

          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            name: true,
            phone: true,
            followings: true,
            joinedAt: true,
            updatedAt: true,
            activate: true,
            authority: true,
          }
        })
        return {
          ok: true,
          users
        }
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4105"
        }
      }
    })
  }
}