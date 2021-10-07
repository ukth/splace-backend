import client from "../../client";;

export default {
  Query: {
    searchSplaces: async (_, { keyword, lat, long, distance }) => {
      try {

        var query = {
          "query": {
            "geo_distance": {
              "distance": distance,
              "location": {
                "lat": lat,
                "lon": long
              }
            }
          }
        }

        var response = await client.search({
          index: index_name,
          body: query
        })
        const starts = keyword + '%'
       
        return {
          ok: true,
          searchedSplaces: result
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant search splace"
        }
      }
    }
  },
};
