import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFollowings: protectedResolver(async (_, { userId, keyword, lastId }, { loggedInUser }) => {
      try {
        const ok = await client.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR2114",
          };
        }
        if (userId != loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR111#"
          }
        }
        const followLogs = await client.followLog.findMany({
          where: {
            requestUserId: userId,
            target: {
              username: {
                startsWith: keyword
              },
              activate: true
            }
          },
          include: {
            target: {
              select: {
                id: true,
                username: true,
                name: true
              }
            }
          },
          take: 15,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
        });
        const followings = followLogs.map(followLog => followLog.target)
        return {
          ok: true,
          followings,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4115"
        }
      }
    })
  },
};