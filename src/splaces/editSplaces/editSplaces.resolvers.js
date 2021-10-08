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
    editSplaces: protectedResolver(async (
      _,
      { splaceId, name, geolog, geolat, address, itemId, categoryIds, bigCategoryIds, specialTagIds, kids, parking, pets },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({
          where: {
            id: splaceId
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
        if (previous.ownerId != loggedInUser.id) {
          return {
            ok: false,
            error: "you are not the owner of this splace!"
          };
        }
        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            name,
            geolat,
            geolog,
            address,
            kids,
            parking,
            pets,
            ...(itemId != null && {
              item: {
                disconnect: true,
                connect: {
                  id: itemId
                }
              },
            }),
            ...(categoryIds != null && {
              categories: {
                disconnect: previous.categories.map(category => ({
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
                disconnect: previous.bigCategories.map(bigCategory => ({
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
                disconnect: previous.specialtags.map(specialTag => ({
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
          error: "cant edit splace",
        };
      }
    }),
  }
};
