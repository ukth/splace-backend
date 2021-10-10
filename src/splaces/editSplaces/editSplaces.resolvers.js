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
      { splaceId, name, lat, lon, address, itemId, categoryIds, bigCategoryIds, specialTagIds, kids, parking, pets },
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

        const location = lat + ", " + lon
        var index_name = "splace"

        var query = {
          "query": {
            "bool": {
              "filter": {
                "term": {
                  "id": previous.id,
                }
              },
              "must": [
                {
                  "match_all": {}
                }
              ]
            }
          }
        }

        var ok = await searchEngine.search({
          index: index_name,
          body: query
        })

        if (ok.body.hits.hits.length !== 1) {
          return {
            ok: false,
            error: "opensearch error"
          }
        }

        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            name,
            lon,
            lat,
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

        var document = {
          "doc": {
            "location": location
          }
        }

        console.log(ok.body.hits.hits[0]._id)

        var response = await searchEngine.update({
          id: ok.body.hits.hits[0]._id,
          index: index_name,
          body: document
        })

        console.log(response);

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
