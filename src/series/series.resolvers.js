import client from "../client";

export default {
  Series: {
    isScraped: async ({ id }, _, { loggedInUser }) => {
      const yes = await client.scrapedSeries.findFirst({
        where: {
          seriesId: id,
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