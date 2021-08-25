import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword }) =>
      client.user.findMany({
        take: 61,
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        orderBy: {
          username: "asc",
        },
      }),
  },
};
