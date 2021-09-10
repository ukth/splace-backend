import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPhotolog: protectedResolver(async (
      _,
      { photologId, title, imageUrls, photoSize, text, splaceId, hashtags, isPrivate },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.photolog.findFirst({
          where: {
            id: photologId,
            author: {
              id: loggedInUser.id
            }
          }
        });
        if (!ok) {
          return {
            ok: false,
            error: "you can edit only yours!"
          };
        }
        const a = await client.photolog.update({
          where: {
            id: photologId
          },
          data: {
            title,
            imageUrls,
            text,
            photoSize,
            isPrivate,
            ...(splaceId != null && {
              splace: {
                disconnect: true,
                connect: {
                  id: splaceId
                },
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
