import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPhotolog: protectedResolver(async (
      _,
      { photologId, title, imageUrls, photoSize, text, splaceId, seriesId, hashtags },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.photolog.findUnique({ where: { photologId } });
        if (previous.authorId != loggedInUser.userId) {
          return {
            ok: false,
            error: "you can edit only yours!"
          };
        }
        const a = await client.photolog.update({
          where: {
            photologId
          },
          data: {
            title,
            imageUrls,
            text,
            photoSize,
            ...(splaceId != null && {
              splace: {
                disconnect: true,
                connect: {
                  splaceId
                },
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
                  where: { name: hashtag }
                }))
              }
            }),
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant edit log",
        };
      }
    }),
  }
};
