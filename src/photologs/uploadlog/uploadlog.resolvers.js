import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"

function validateCategory(text) {
  if(text.length < 1 || text.length > 30) return false
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
      { title, imageUrls, photoSize, text, splaceId, isPrivate, categories, bigCategoryIds, specialTagIds, seriesIds },
      { loggedInUser }
    ) => {
      try {
        if(imageUrls.length == 0 || imageUrls.length > 8) {
          return{
            ok: false,
            error: "ERROR1213"
          }
        }
        for(var i = 0; i<categories.length; i++){
          if(!validateCategory(categories[i])) {
            return {
              ok: false,
              error: "ERROR1214"
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
            ...(specialTagIds != null && {
              specialtags: {
                connect: specialTagIds.map(specialTagId => ({
                  id: specialTagId
                })),
              },
            }),
          },
        });


        if (splaceId) {
          const a = await client.splace.findFirst({
            where: {
              id: splaceId,
              activate: true,
            },
            include: {
              categories: true,
              bigCategories: true,
              specialtags: true,
            }
          })

          if (a && b.isPrivate == false) {

            const location = a.lat + ", " + a.lon
            var index_name = "photolog_search"
            const cNames = a.categories.map(category => category.name)
            const bcNames = a.bigCategories.map(bigCategory => bigCategory.name)
            const bigCategoryIds = a.bigCategories.map(bigCategory => bigCategory.id)
            const stNames = a.specialtags.map(specialTag => specialTag.name)
            const specialTagIds = a.specialtags.map(specialTag => specialTag.id)
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
              "stringST": AtoS(specialTagIds),
              "specialTags": AtoS(stNames)
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
