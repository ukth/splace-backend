import client from "../client";

export default {
  User: {
    totalFollowing: ({ userId }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              userId,
            },
          },
        },
      }),
    totalFollowers: ({ userId }) =>
      client.user.count({
        where: {
          following: {
            some: {
              userId,
            },
          },
        },
      }),
    isMe: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.userId;
    },
    isFollowing: async ({ userId }, _, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return false;
        }
        const exists = await client.user.count({
          where: {
            userId: loggedInUser.userId,
            followings: {
              some: {
                userId,
              },
            },
          },
        });
        return Boolean(exists);
      } catch (e) {
        return false;
      }
    },
    totalLogsNumber: ({ userId }) =>
      client.photolog.count({
        where: {
          author: {
            userId
          },
        },
      }),
  },
};