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
      { splaceId, name, itemName, itemPrice, menuUrls, categoryIds, bigCategoryIds, specialTagIds, noKids, parking, pets, breakDays, phone, url, hollydayBreak, intro },
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
            error: "ERROR5471"
          };
        }

        const location = lat + ", " + lon
        var index_name = "splace_search"

        /*var query = {
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
        }   */

        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            name,
            lon,
            lat,
            intro,
            address,
            noKids,
            parking,
            pets,
            itemName,
            itemPrice,
            menuUrls,
            breakDays,
            phone,
            url,
            hollydayBreak,
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

        var document = {
          "doc": {
            "location": location
          }
        }

        //console.log(ok.body.hits.hits[0]._id)

        var response = await searchEngine.update({
          id: splaceId,
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
          error: "ERROR4413",
        };
      }
    }),
  }
};
