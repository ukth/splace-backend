import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


function AtoS(arr) {
  var str = ""
  for(var i = 0; i < arr.length; i++){
    str = str + arr[i] + ' '
  }
  return str
}
export default {
  Mutation: {
    uploadLog: protectedResolver(async (
      _,
      { title, imageUrls, photoSize, text, splaceId, isPrivate, categoryIds, bigCategoryIds, specialTagIds, seriesIds },
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
                connect: seriesIds.map(seriesId => ({
                  id: seriesId
                }))
              }
            }),
            ...(categoryIds != null && {
              categories: {
                connect: categoryIds.map(categoryId => ({
                  id: categoryId
                })),
              },
              stringC: AtoS(categoryIds)
            }),
            ...(bigCategoryIds != null && {
              bigCategories: {
                connect: bigCategoryIds.map(bigCategoryId => ({
                  id: bigCategoryId
                })),
              },
              stringBC: AtoS(bigCategoryIds)
            }),
            ...(specialTagIds != null && {
              specialtags: {
                connect: specialTagIds.map(specialTagId => ({
                  id: specialTagId
                })),
              },
              stringST: AtoS(specialTagIds)
            }),
          },
        });
        //console.log(a);
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
