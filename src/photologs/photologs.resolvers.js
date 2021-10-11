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
        console.log(e);
        return null;
      }
    },
    isILiked: async ({ id }, _, { loggedInUser }) => {
      try {
        const yes = await client.user.findFirst({
          where: {
            id: loggedInUser.id,
            likedPhotologs: {
              some: {
                id
              }
            }
          },
        })
        //console.log(yes);
        return Boolean(yes);
      } catch(e){
        console.log(e)
        return null;
      }
    },

    isScraped: async ({ id }, _, { loggedInUser }) => {
      const yes = await client.scrapedLog.findFirst({
        where: {
          photologId: id,
          savedUserId: loggedInUser.id
        }
      })
      return Boolean(yes);
    }
    /*isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      
      return authorId == loggedInUser.userId;
    },*/
  },
};