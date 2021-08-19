import client from "../client";

export default {
  Photolog: {
    totalLiked: ({ photologId }) =>
      client.user.count({
        where: {
          likedPhotologs: {
            some: {
              photologId,
            },
          },
        },
      }),
    isILiked: ({ likedUser }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      var yes = likedUser.filter(function(user){
        return user.userId == loggedInUser.userId;
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