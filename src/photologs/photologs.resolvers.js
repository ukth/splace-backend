import client from "../client";

export default {
  Photolog: {
    totalLiked: async ({ id }) => {
      try {
        const num = await client.likeLog.count({
          where: {
            targetId: id
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
        const yes = await client.likeLog.findFirst({
          where: {
            targetId: id
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
          scrapedUserId: loggedInUser.id
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