import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    uploadLog: async (
      _,
      { title, texts, photoLogsUrls, splaceIds, hashtags }, 
      { loggedInUser  }
    ) => {
      try {
	console.log("in upload!")
        const logId = await client.log.create({
          data: {
            user: {
              connect: {
                userId: loggedInUser.userId
              }
            },
            title,
            photologs: {
              create: photoLogsUrls.map((urls, index) => (
                {
                  imageUrls: urls,
                  text: texts[index],
                  splace: {
                    connect : {
                      splaceId: splaceIds[index]
                    }
                  },
                  hashtags: {
                    connectOrCreate: hashtags[index].map(hashtag => ({
                      create: { name: hashtag },
                      where: { name: hashtag }
                    }))
                  }
              }))
            }
          },
        });
        // await client.photolog.createMany({
        //   data: 
        // });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant create account",
        };
      }
    },
  }
};
