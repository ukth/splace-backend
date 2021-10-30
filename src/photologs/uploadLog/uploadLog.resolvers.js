import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"

function validateCategory(text) {
  if (text.length < 1 || text.length > 30) return false
  const exp = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/;
  return exp.test(String(text).toLowerCase());
};

function AtoS(arr) {
  var str = ""
  for (var i = 0; i < arr.length; i++) {
    str = str + arr[i] + ' '
  }
  return str
}
export default {
  Mutation: {
    uploadLog: protectedResolver(async (
      _,
      { imageUrls, photoSize, text, splaceId, isPrivate, categories, bigCategoryIds, seriesIds },
      { loggedInUser }
    ) => {
      try {
        if (imageUrls.length == 0 || imageUrls.length > 8) {
          return {
            ok: false,
            error: "ERROR1213"
          }
        }

        if (seriesIds) {
          if (seriesIds.length > 10) {
            return {
              ok: false,
              error: "ERROR1216"
            }
          }
        }
        if (categories) {
          if (categories.length > 10) {
            return {
              ok: false,
              error: "ERROR1215"
            }
          }
          for (var i = 0; i < categories.length; i++) {
            if (!validateCategory(categories[i])) {
              return {
                ok: false,
                error: "ERROR1214"
              }
            }
          }
        }

        const b = await client.photolog.create({
          data: {
            author: {
              connect: {
                id: loggedInUser.id
              }
            },
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
            ...(categories != null && {
              categories: {
                connectOrCreate: categories.map(category => ({
                  create: { name: category },
                  where: { name: category }
                }))
              }
            }),
            ...(bigCategoryIds != null && {
              bigCategories: {
                connect: bigCategoryIds.map(bigCategoryId => ({
                  id: bigCategoryId
                })),
              },
            }),
          },
        });

        if (seriesIds) {
          for (var i = 0; i < seriesIds.length; i++) {
            const series = await client.series.findFirst({
              where: {
                id: seriesIds[i]
              },
              include: {
                seriesElements: true
              }
            })
            if (series.seriesElements.length > 98) {
              return {
                ok: false,
                error: "ERROR####"
              }
            }
          }

          for (var i = 0; i < seriesIds.length; i++) {
            const series = await client.series.findFirst({
              where: {
                id: seriesIds[i]
              },
              include: {
                seriesElements: true
              }
            })
            const element = await client.seriesElement.create({
              data: {
                order: series.seriesElements.length + 1,
                photolog: {
                  id: b.id
                },
                sereis: {
                  id: series.id
                }
              }
            })
          }
        }

        if (splaceId) {
          const a = await client.splace.findFirst({
            where: {
              id: splaceId,
              activate: true,
            },
            include: {
              categories: true,
              bigCategories: true,
            }
          })

          if (a && b.isPrivate == false) {

            const location = a.lat + ", " + a.lon
            var index_name = "photolog_search"
            const cNames = a.categories.map(category => category.name)
            const bcNames = a.bigCategories.map(bigCategory => bigCategory.name)
            const bigCategoryIds = a.bigCategories.map(bigCategory => bigCategory.id)
            var address_array = a.address.split(" ")
            const address_2 = address_array[1].length > 2 ? address_array[1].substring(0, address_array[1].length - 1) : address_array[1]
            const address = address_array[0] + " " + address_2

            var document = {
              "id": b.id,
              "name": a.name,
              "address": address,
              "location": location,
              "intro": a.intro,
              "thumbnail": b.imageUrls[0],
              "noKids": a.noKids,
              "pets": a.pets,
              "parking": a.parking,
              "categories": AtoS(cNames),
              "stringBC": AtoS(bigCategoryIds),
              "bigCategories": AtoS(bcNames),
            }

            var response = await searchEngine.create({
              id: b.id,
              index: index_name,
              body: document
            })

            if (response.body.result != "created") {
              return {
                ok: false,
                error: "ERROR4416"
              }
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
          error: "ERROR421B",
        };
      }
    }),
  }
};