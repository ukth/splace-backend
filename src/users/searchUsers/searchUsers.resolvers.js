import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      try {
        const userbyid = await client.user.findMany({
          take: 20,
          where: {
            username: {
              startsWith: keyword.toLowerCase(),
            },
          },
          orderBy: {
            username: "asc",
          },
          select: {
            id: true,
            username: true,
            name: true,
          }
        })

        const userbyname = await client.user.findMany({
          take: 20,
          where: {
            name: {
              startsWith: keyword.toLowerCase(),
            },
          },
          orderBy: {
            name: "asc",
          },
          select: {
            id: true,
            username: true,
            name: true
          }
        })

        const users = userbyid.concat(userbyname)

        //const users = null
        
        return {
          ok: true,
          users: users
        };
      } catch(e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4113"
        }
      }
    }
  },
};
