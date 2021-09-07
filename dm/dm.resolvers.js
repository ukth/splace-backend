import client from "../client";

export default {
  Message: {
    isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      
      return authorId == loggedInUser.id;
    },
  },
};