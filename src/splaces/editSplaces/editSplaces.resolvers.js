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
      { splaceId, name, thumbnail, itemName, itemPrice, menuUrls, categoryIds, bigCategoryIds, specialTagIds, noKids, parking, pets, phone, url, intro },
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
            cNames,
            bcNames,
            stNames,
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
                connectOrCreate: categories.map(category => ({
                  create: { name: category },
                  where: { name: category }
                }))
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
          },
          include: {
            categories: true,
            bigCategories: true,
            specialtags: true,
          }
        });
        
        var index_name = "splace_search"
        const cNames = a.categories.map(category => category.name)
        const bcNames = a.bigCategories.map(bigCategory => bigCategory.name)
        const bcIds = a.bigCategories.map(bigCategory => bigCategory.id)
        const stNames = a.specialtags.map(specialTag => specialTag.name)
        const stIds = a.specialtags.map(specialTag => specialTag.id)

        var document = {
          "doc": {
            "name": a.name,
            "categories": AtoS(cNames),
            "stringBC": AtoS(bcIds),
            "bigCategories": AtoS(bcNames),
            "stringST": AtoS(stIds),
            "specialTags": AtoS(stNames),
            "intro": a.intro,
            "thumbnail": a.thumbnail,
            "nokids": a.noKids,
            "parking": a.parking,
            "pets": a.pets,
          }
        }

        //console.log(ok.body.hits.hits[0]._id)

        var response = await searchEngine.update({
          id: splaceId,
          index: index_name,
          body: document
        })

        //console.log(response);
        //console.log(response.body.result);

        if (response.body.result != "updated") {
          return {
            ok: false,
            error: "ERROR4417"
          }
        }

        const ids = await client.photolog.findMany({
          where: {
            splaceId,
            isPrivate: false
          },
          select: {
            id: true
          }
        })

        for (var i = 0; i < ids.length; i++) {
          const photologId = ids[i].id
          console.log(photologId)
          index_name = "photolog_search"

          var document = {
            "doc": {
              "name": a.name,
              "categories": AtoS(cNames),
              "stringBC": AtoS(bcIds),
              "bigCategories": AtoS(bcNames),
              "stringST": AtoS(stIds),
              "specialTags": AtoS(stNames),
              "intro": a.intro,
              "nokids": a.noKids,
              "parking": a.parking,
              "pets": a.pets,
            }
          }

          //console.log(ok.body.hits.hits[0]._id)

          var response = await searchEngine.update({
            id: photologId,
            index: index_name,
            body: document
          })

          console.log(response.body.result)

          if (response.body.result != "updated") {
            return {
              ok: false,
              error: "ERROR4417"
            }
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
