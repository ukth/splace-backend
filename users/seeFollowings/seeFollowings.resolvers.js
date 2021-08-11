import client from "../../client";

export default {
  Query: {
    seeFollowings: async (_, { userId, lastId }) => {
      const ok = await client.user.findUnique({
        where: { userId },
        select: { userId: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followings = await client.user
        .findUnique({ where: { userId } })
        .followings({
          take: 5,
          ...(lastId && { cursor: { userId: lastId } }),
          skip: lastId ? 1 : 0,
        });
      return {
        ok: true,
        followings,
      };
    },
  },
};