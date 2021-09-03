import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadLog: protectedResolver(async (
      _,
      { title, imageUrls, photoSize, text, splaceId, seriesId, hashtags },
      { loggedInUser }
    ) => {
      try {
        const a = await client.photolog.create({
          data: {
            author: {
              connect: {
                userId: loggedInUser.userId
              }
            },
            title,
            imageUrls,
            text,
            photoSize,
            ...(splaceId != null && {
              splace: {
                connect: {
                  splaceId
                }
              },
            }),
            ...(seriesId != null && {
              series: {
                connect: {
                  seriesId
                }
              },
            }),
            ...(hashtags != null && {
              hashtags: {
                connectOrCreate: hashtags.map(hashtag => ({
                  create: { name: hashtag },
                  where: { name: hashtag  }
                }))
              }
            }),
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant create log",
        };
      }
    }),
  }
};
