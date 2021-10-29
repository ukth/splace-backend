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
    isSaved: async ({ id }, _, { loggedInUser }) => {
      try {
        const save = await client.save.findFirst({
          where: {
            splace: {
              id
            },
            savedUser: {
              id: loggedInUser.id
            }
          }
        })
        return Boolean(save)
      } catch {
        return false
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