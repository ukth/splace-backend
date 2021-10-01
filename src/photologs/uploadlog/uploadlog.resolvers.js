import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadLog: protectedResolver(async (
      _,
      { title, imageUrls, photoSize, text, splaceId, isPrivate, hashtags, seriesIds },
      { loggedInUser }
    ) => {
      try {
        const a = await client.photolog.create({
          data: {
            author: {
              connect: {
                id: loggedInUser.id
              }
            },
            title,
            imageUrls,
            text,
            isPrivate,
            photoSize,
            ...(splaceId != null && {
              splace: {
                connect: {
                  id: splaceId
                }
              },
            }),
            ...(seriesIds != null && {
              series: {
                connectOrCreate: seriesIds.map(hashtag => ({
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