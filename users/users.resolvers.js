import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          followings: {
            some: {
              id
            },
          },
        },
      }),
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
        return false;
      }
    },
    totalLogsNumber: ({ id }) =>
      client.photolog.count({
        where: {
          author: {
            id
          },
        },
      }),
  },
};