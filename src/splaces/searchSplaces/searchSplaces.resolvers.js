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
  Mutation: {
    searchSplaces: async (_, { lastId, type, keyword, lat, long, distance, bigCategoryIds, ratingTagIds, noKids, parking, pets }) => {
      try {
        var index_name = type + "_search"
        var filter = new Array();
        if (bigCategoryIds) {
          filter.push({
            "terms": {
              "stringBC": toSearch(bigCategoryIds)
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

        if (lat && long && distance) {
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

        if (keyword) {
          filter.push({
            "multi_match": {
              "fields": ["*"],
              "query": keyword
            }
          })
        }

        if (noKids) {
          filter.push({
            "match": {
              "noKids": true
            }
          })
        }

        if (pets) {
          filter.push({
            "match": {
              "pets": true
            }
          })
        }

        if (parking) {
          filter.push({
            "match": {
              "parking": true
            }
          })
        }

        var query = {
          "from": lastId,
          "size": 20,
          "query": {
            "bool": {
              "filter": filter,
              "must": [
                {
                  "match_all": {}
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

        if (keyword.length != 0) {
          const logging = await client.searchLog.create({
            data: {
              userId: loggedInUser.id,
              keyword: keyword
            }
          })
        }

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
