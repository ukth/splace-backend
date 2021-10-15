import client from "../../client";
import searchEngine from "../../opensearch";

function toSearch(arr) {
  var narr = new Array();
  for (var i = 0; i < arr.length; i++) {
    narr.push("" + arr[i])
  }
  return narr
}

export default {
  Query: {
    searchSplaces: async (_, { keyword, lat, long, distance, bigCategoryIds, specialTagIds, ratingTagIds }) => {
      try {
        var index_name = "splace_search"
        var filter = new Array();
        if (bigCategoryIds) {
          filter.push({
            "terms": {
              "stringBC": toSearch(bigCategoryIds)
            }
          })
        }
        if (specialTagIds) {
          filter.push({
            "terms": {
              "stringST": toSearch(specialTagIds)
            }
          })
        }
        if (ratingTagIds) {
          filter.push({
            "terms": {
              "stringRT": toSearch(ratingTagIds)
            }
          })
        }

        if (lat&&long&&distance){
          filter.push({
            "geo_distance": {
              "distance": distance,
              "location": {
                "lat": lat,
                "lon": long
              }
            }
          })
        }

        var query = {
          "query": {
            "bool": {
              "filter": filter,
              "must": [
                {
                  "multi_match" : {
                    "fields" : ["*"],
                    "query" : keyword
                  }
                }
              ]
            }
          }
        }

        //console.log(query);

        var response = await searchEngine.search({
          index: index_name,
          body: query
        })

        //console.log(response)
        const searchedSplaces = response.body.hits.hits.map(result => result._source);

        //console.log(searchedSplaces)
        return {
          ok: true,
          searchedSplaces
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4401"
        }
      }
    }
  },
};
