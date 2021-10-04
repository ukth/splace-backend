import client from "../client";

export default {
  User: {
    totalFollowing: async ({ id }) => {
      try {
        const num = await client.user.count({
          where: {
            followers: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    totalFollowers: async ({ id }) => {
      try {
        const num = await client.user.count({
          where: {
            followings: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return false;
        }
        const exists = await client.user.count({
          where: {
            id: loggedInUser.id,
            followings: {
              some: {
                id,
              },
            },
          },
        });
        return Boolean(exists);
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    totalLogsNumber: async ({ id }) => {
      try {
        const num = await client.photolog.count({
          where: {
            author: {
              id
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  },
};