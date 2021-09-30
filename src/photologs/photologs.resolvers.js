import client from "../client";

export default {
  Photolog: {
    totalLiked: async ({ id }) => {
      try {
        const num = await client.user.count({
          where: {
            likedPhotologs: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        return null;
      }
    },
    isILiked: ({ likedUser }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      var yes = likedUser.filter(function (user) {
        return user.id == loggedInUser.id;
      });
      return yes.length == 1;
    },
    /*isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      
      return authorId == loggedInUser.userId;
    },*/
  },
};