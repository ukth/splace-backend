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
        const logId = await client.log.create({
          data: {
            user: {
              connect: {
                userId: loggedInUser.userId
              }
            },
            title
          },
        });
        await client.photolog.createMany({
          data: photoLogsUrls.map((urls, index) => (
            {
              imageUrls: urls,
              text: texts[index],
              splace: {
                connect : {
                  splaceId: splaceIds[index]
                }
              },
              log: {
                connect: {
                  logId
                }
              },
              user: {
                connect: {
                  userId: loggedInUser.userId
                }
              },
              // hashtags: hashtags[index].map(hashtag => ({
              //   connect:{
              //     name: hashtag
              //   }
              // }))
          }))
        });
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