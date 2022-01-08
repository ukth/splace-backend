import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeFollowers: protectedResolver(async (_, { userId, keyword, lastId }, { loggedInUser }) => {
      try {
        const ok = await client.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });

        if (!ok) {
          return {
            ok: false,
            error: "ERROR2113",
          };
        }
        const followLogs = await client.followLog.findMany({
          where: {
            targetId: userId,
            requestUser: {
              username: {
                startsWith: keyword
              },
              activate: true
            },
          },
          include: {
            requestUser: true
          },
          take: 15,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
        });
        const followings = followLogs.map(followLog => followLog.requestUser)
        return {
          ok: true,
          followers,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4114"
        }
      }
    })
  },
};