import client from "../../client";
import searchEngine from "../../opensearch";

function toSearch(arr) {
  var narr = new Array();
  for (var i = 0; i < arr.length; i++) {
    narr.push("#" + arr[i] + "#")
  }
  return narr
}

export default {
  Query: {
    searchSplaces: async (_, { keyword, lat, long, distance, categoryIds, bigCategoryIds, specialTagIds, ratingTagIds }) => {
      try {
        var index_name = "splace"
        var filter = new Array();
        if (categoryIds) {
          filter.push({
            "terms": {
              "stringC": toSearch(categoryIds)
            }
          })
        }
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

        var query = {
          "query": {
            "bool": {
              "filter": [
                {
                  "terms": {
                    "stringc": ["#1# #2# "],
                  }
                },
              ],
              "must": [
                {
                  "match_all": {}
                }
              ]
            }
          }
        }


        /*var query = {
          "query": {
            "bool": {
              ...(lat != null && long != null && distance != null && {
                "geo_distance": {
                  "distance": distance,
                  "location": {
                    "lat": lat,
                    "lon": long
                  }
                }
              }),
              "filter": filter
            }
          }
        }*/

        console.log(query);

        var response = await searchEngine.search({
          index: index_name,
          body: query
        })

        console.log(response)
        console.log(response.body.hits.hits);

        var query = {
          "query": {
            "match_all": {}
          }
        }
        var response = await searchEngine.search({
          index: index_name,
          body: query
        })
        console.log(response)
        console.log(response.body.hits.hits);

        return {
          ok: true,
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
