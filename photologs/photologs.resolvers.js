import client from "../client";

export default {
  Photolog: {
    totalLiked: ({ id }) =>
      client.user.count({
        where: {
          likedPhotologs: {
            some: {
              id
            },
          },
        },
      }),
    isILiked: ({ likedUser }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      var yes = likedUser.filter(function(user){
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