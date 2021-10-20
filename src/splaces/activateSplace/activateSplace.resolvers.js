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
        var index_name = "splace_search"

        var document = {
          "id" : a.id,
          "name": a.name,
          "address": a.address,
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
