import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyBlockedUser: protectedResolver(async (_, { }, { loggedInUser }) => {
      try {
        const users = await client.user.findMany({
          where: {
            blockingUser: {
              some: {
                id: loggedInUser.id
              }
            }
          },

          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            name: true,
            joinedAt: true,
            updatedAt: true,
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
          error: "ERROR4104"
        }
      }
    })
  }
}