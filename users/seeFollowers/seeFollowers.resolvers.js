import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userId, lastId }) => {
      try {
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
        const followers = await client.user
          .findUnique({ where: { userId } })
          .followers({
            take: 5,
            ...(lastId && { cursor: { userId: lastId } }),
            skip: lastId ? 1 : 0,
          });
        return {
          ok: true,
          followers,
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant find followers"
        }
      }
    },
  },
};