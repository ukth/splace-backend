import client from "../../client";
import searchEngine from "../../opensearch"
import { protectedResolver } from "../../users/users.utils";

function AtoS(arr) {
  var str = ""
  for (var i = 0; i < arr.length; i++) {
    str = str + arr[i] + ' '
  }
  return str
}

export default {
  Mutation: {
    editSplaces: protectedResolver(async (
      _,
      { splaceId, name, thumbnail, itemName, itemPrice, menuUrls, categoryIds, bigCategoryIds, specialTagIds, noKids, parking, pets, phone, url, intro, cNames, bcNames, stNames },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
            ownerId: loggedInUser.id,
            activate: true,
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
            error: "ERROR5471"
          };
        }


        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            name,
            intro,
            noKids,
            parking,
            pets,
            itemName,
            itemPrice,
            menuUrls,
            phone,
            url,
            thumbnail,
            ...(categoryIds != null && {
              categories: {
                disconnect: previous.categories.map(category => ({
                  id: category.id
                })),
                connect: categoryIds.map(categoryId => ({
                  id: categoryId
                })),
              },
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
            }),

          }
        });

        var index_name = "splace_search"

        var document = {
          "doc": {
            ...(name && { "name": name }),
            ...(categoryIds && {
              "categories": AtoS(cNames)
            }),
            ...(bigCategoryIds && {
              "stringBC": AtoS(bigCategoryIds),
              "bigCategories": AtoS(bcNames)
            }),
            ...(specialTagIds && {
              "stringST": AtoS(specialTagIds),
              "specialTags": AtoS(stNames)
            }),
            ...(intro && { "intro": intro }),
            ...(thumbnail && { "thumbnail": thumbnail })
          }
        }

        //console.log(ok.body.hits.hits[0]._id)

        var response = await searchEngine.update({
          id: splaceId,
          index: index_name,
          body: document
        })

        //console.log(response);

        if (response.body.result != "updated") {
          return {
            ok: false,
            error: "ERROR4417"
          }
        }

        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4413",
        };
      }
    }),
  }
};
