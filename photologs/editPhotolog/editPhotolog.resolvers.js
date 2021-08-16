import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editPhotolog: protectedResolver(async (
      _,
      { photologId, title, imageUrls, photoSize, text, splaceId, seriesId, hashtagIds },
      { loggedInUser }
    ) => {
      const previous = await client.photolog.findUnique( { where : { photologId } } );
      if(previous.authorId != loggedInUser.userId){
        return{
          ok: false,
          error: "you can edit only yours!"
        };
      }
      try {
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
                disconnect: true,
                connect: {
                  seriesId
                }
              },
            }),
            ...(hashtagIds != null && {
              hashtags: {
                disconnect: true,
                connect: hashtagIds.map(id => ({
                  hashtagId: id
                }))
              }
            }),
          }
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant edit log",
        };
      }
    }),
  }
};
