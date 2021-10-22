import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"

export default {
  Mutation: {
    activateSplace: protectedResolver(async (
      _,
      { splaceId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
            activate: false,
          },
        });
        if (!ok || loggedInUser.authority != "root") {
          return {
            ok: false,
            error: "ERROR5472"
          };
        }

        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            activate: true
          }
        });

        for (var i = 0; i < 7; i++) {
          //console.log(1)
          const c = await client.timeSet.create({
            data: {
              day: i,
              splace: {
                connect: {
                  id: a.id
                }
              }
            }
          })
          //console.log(c)
        }

        const location = a.lat + ", " + a.lon
        var address_array = a.address.split(" ")
        const address_2 = address_array[1].length > 2 ? address_array[1].substring(0, address_array[1].length - 1) : address_array[1]
        const address = address_array[0] + " " + address_2
        var index_name = "splace_search"

        var document = {
          "id": a.id,
          "name": a.name,
          "address": address,
          "location": location,
          "intro": a.intro,
        }

        var response = await searchEngine.create({
          id: a.id,
          index: index_name,
          body: document
        })

        console.log(response);

        if (response.body.result != "created") {
          return {
            ok: false,
            error: "ERROR4416"
          }
        }

        const photologs = await client.photolog.findMany({
          where: {
            splaceId,
            isPrivate: false
          },
          select: {
            id: true,
            imageUrls: true,
          }
        })

        for (var i = 0; i < photologs.length; i++) {
          const photolog = photologs[i]
          //console.log(photologId)
          index_name = "photolog_search"

          var document = {
            "doc": {
              "id": photolog.id,
              "thumbnail": photolog.imageUrls[0],
              "location": location,
              "address": address,
              "name": a.name,
              "intro": a.intro,
              "nokids": a.noKids,
              "parking": a.parking,
              "pets": a.pets,
            }
          }

          //console.log(ok.body.hits.hits[0]._id)

          var response = await searchEngine.create({
            id: photolog.id,
            index: index_name,
            body: document
          })

          //console.log(response.body.result)

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
