import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userId, page }) => {

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
          skip: (page - 1) * 5,
        });

      const totalFollowers = await client.user.count({
        where: { followings: { some: { userId } } },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};