import { OpsWorks } from "aws-sdk";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

function AtoS(arr) {
  var str = ""
  for(var i = 0; i < arr.length; i++){
    str = str + '#' + arr[i] + '# '
  }
  return str
}

export default {
  Mutation: {
    editPhotolog: protectedResolver(async (
      _,
      { photologId, title, imageUrls, photoSize, text, splaceId, categoryIds, bigCategoryIds, specialTagIds, isPrivate },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.photolog.findFirst({
          where: {
            id: photologId,
            author: {
              id: loggedInUser.id
            }
          },
          include: {
            categories: {
              select: {
                id: true
              }
            },
            bigCategories: {
              select: {
                id: true
              }
            },
            specialtags: {
              select: {
                id: true
              }
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
            ...(categoryIds != null && {
              categories: {
                disconnect: ok.categories.map(category => ({
                  id: category.id
                })),
                connect: categoryIds.map(categoryId => ({
                  id: categoryId
                })),
              },
              stringC: AtoS(categoryIds)
            }),
            ...(bigCategoryIds != null && {
              bigCategories: {
                disconnect: ok.bigCategories.map(bigCategory => ({
                  id: bigCategory.id
                })),
                connect: bigCategoryIds.map(bigCategoryId => ({
                  id: bigCategoryId
                })),
              },
              stringBC: AtoS(bigCategoryIds)
            }),
            ...(specialTagIds != null && {
              specialtags: {
                disconnect: ok.specialtags.map(specialTag => ({
                  id: specialTag.id
                })),
                connect: specialTagIds.map(specialTagId => ({
                  id: specialTagId
                })),
              },
              stringST: AtoS(specialTagIds)
            }),
          }
        });
        //console.log(a);
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
