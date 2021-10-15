import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"

export default {
  Mutation: {
    createSplaces: protectedResolver(async (
      _,
      { name, lat, lon, address},
      { loggedInUser }
    ) => {
      try {
        const a = await client.splace.create({
          data: {
            name,
          },
        });

        const location = lat + ", " + lon
        var index_name = "splace_search_test"
        
        var document = {
          "doc": {
            "name" : name,
            "address" : address,
            "location": location
          }
        }

        var response = await searchEngine.create({
          id: a.id,
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
          error: "ERROR4411",
        };
      }
    }),
  }
};
