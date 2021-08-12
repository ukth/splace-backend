import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadLog: protectedResolver(async (
      _,
      { title, texts, photoLogsUrls, splaceIds, hashtags },
      { loggedInUser }
    ) => {
      try {
        const logId = await client.log.create({
          data: {
            user: {
              connect: {
                userId: loggedInUser.userId
              }
            },
            title,
            photologs: {
              create: photoLogsUrls.map((urls, index) => ({
                imageUrls: urls,
                text: texts[index],
                splace: {
                  connect: {
                    splaceId: splaceIds[index]
                  }
                },
                hashtags: {
                  connectOrCreate: hashtags[index].map(hashtag => ({
                    create: { name: hashtag },
                    where: { name: hashtag }
                  }))
                },
                user: {
                  connect: {
                    userId: loggedInUser.userId
                  }
                }
              }))
            }
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant create log",
        };
      }
    }),
  }
};
