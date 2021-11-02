import client from "../../client";
import searchEngine from "../../opensearch"
import { protectedResolver } from "../../users/users.utils";

function validateCategory(text) {
  if (text.length < 1 || text.length > 30) return false
  const exp = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/;
  return exp.test(String(text).toLowerCase());
};

function validateUrl(text) {
  const exp = /^[0-9a-z_\-.&?=:\/]*$/;
  return exp.test(String(text).toLowerCase());
};

function validatePhone(text) {
  const exp = /^01([0|1|6|7|8|9])?([0-9]{7,8})$/;
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
    editSplaces: protectedResolver(async (
      _,
      { detailAddress, splaceId, name, thumbnail, itemName, itemPrice, menuUrls, categories, bigCategoryIds, noKids, parking, pets, phone, url, intro },
      { loggedInUser }
    ) => {
      try {
        if(phone && !validatePhone(phone)){
          return {
            ok: false,
            error: "ERROR1102"
          }
        }
        if(url && !validateUrl(url)){
          return {
            ok: false,
            error: "ERROR1104"
          }
        }
        if(intro) {
          if(intro.length > 500) {
            return {
              ok: false,
              error: "ERROR1416"
            }
          }
        }
        if (categories) {
          for (var i = 0; i < categories.length; i++) {
            if (!validateCategory(categories[i])) {
              return {
                ok: false,
                error: "ERROR1214"
              }
            }
          }
        }
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
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
          }
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        if (ok.ownerId != loggedInUser.id && ok.ownerId != null) {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        if (ok.ownerId == null && loggedInUser.authority != "editor") {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        var day = new Date()
        var update = new Date(ok.updatedAt)
        if (ok.ownerId == null && day.getTime() - update.getTime() <= 3600000) {
          return {
            ok: false,
            error: "ERROR5473"
          }
        }
        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            detailAddress,
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
            ...(categories != null && {
              categories: {
                disconnect: ok.categories.map(category => ({
                  id: category.id
                })),
                connectOrCreate: categories.map(category => ({
                  create: { name: category },
                  where: { name: category }
                }))
              },
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
            }),
          },
          include: {
            categories: true,
            bigCategories: true,
          }
        });

        var index_name = "splace_search"
        const cNames = a.categories.map(category => category.name)
        const bcNames = a.bigCategories.map(bigCategory => bigCategory.name)
        const bcIds = a.bigCategories.map(bigCategory => bigCategory.id)
        var document = {
          "doc": {
            "name": a.name,
            "categories": AtoS(cNames),
            "stringBC": AtoS(bcIds),
            "bigCategories": AtoS(bcNames),
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

        console.log(response);
        //console.log(response.body.result);

        if (response.body.result != "updated" && response.body.result != "noop") {
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
          //console.log(photologId)
          index_name = "photolog_search"

          var document = {
            "doc": {
              "name": a.name,
              "categories": AtoS(cNames),
              "stringBC": AtoS(bcIds),
              "bigCategories": AtoS(bcNames),
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

          console.log(response)

          if (response.body.result != "updated" && response.body.result != "noop") {
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
