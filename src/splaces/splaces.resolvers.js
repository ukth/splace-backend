import client from "../client";

export default {
  Splace: {
    totalPhotologs: async ({ id }) => {
      try {
        const num = await client.photolog.count({
          where: {
            splaceId: id
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    /*isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      
      return authorId == loggedInUser.userId;
    },*/
  },
};