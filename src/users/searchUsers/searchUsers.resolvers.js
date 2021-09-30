import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      try {
        const users = client.user.findMany({
          take: 61,
          where: {
            username: {
              startsWith: keyword.toLowerCase(),
            },
          },
          orderBy: {
            username: "asc",
          },
        })
        
        return {
          ok: true,
          users: users
        };
      } catch(e) {
        return {
          ok: false,
          error: "cant search users"
        }
      }
    }
  },
};
