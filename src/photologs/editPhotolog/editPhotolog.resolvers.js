import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"

function AtoS(arr) {
  var str = ""
  for (var i = 0; i < arr.length; i++) {
    str = str + arr[i] + ' '
  }
  return str
}

export default {
  Mutation: {
    editPhotolog: protectedResolver(async (
      _,
      { photologId, text, isPrivate },
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
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5212"
          };
        }
        const b = await client.photolog.update({
          where: {
            id: photologId
          },
          data: {
            text,
            isPrivate,
          }
        });

        if (b.splaceId && (ok.isPrivate == true && b.isPrivate == false)) {

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

            var document = {
              "id": photologId,
              "name": a.name,
              "address": a.address,
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

        if (b.splaceId && (ok.isPrivate == false && b.isPrivate == true)) {


          var index_name = "photolog_search"
          var response = await searchEngine.delete({
            id: photologId,
            index: index_name,
          })

          console.log(response.body.result);

          if (response.body.result != "deleted") {
            return {
              ok: false,
              error: "ERROR4419"
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
          error: "ERROR4212",
        };
      }
    }),
  }
};
