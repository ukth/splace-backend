import client from "../../client";
import searchEngine from "../../opensearch";
require("dotenv").config();

function toSearch(arr) {
  var narr = new Array();
  for (var i = 0; i < arr.length; i++) {
    narr.push("" + arr[i])
  }
  return narr
}

export default {
  Query: {
    searchSplaces: async (_, { ratingtagIds, lastId, type, keyword, lat, lon, distance, bigCategoryIds, exceptNoKids, parking, pets }, { loggedInUser }) => {
      try {
        var index_name = type + "_search" + "_" + process.env.SEARCH_VERSION
        var filter = new Array();
        var should = [
          { "match" : { "ratingtags": { "boost" : 0.14, "query" : "Hot" } } },
          { "match" : { "ratingtags": { "boost": 1, "query" : "Superhot"} } },
          { "match" : { "ratingtags": { "boost" : 0.06, "query": "Tasty"} } },
          { "match" : { "ratingtags": { "boost": 0.16, "query" : "Supertasty"} } }
        ]

        if (bigCategoryIds) {
          filter.push({
            "terms": {
              "stringBC": toSearch(bigCategoryIds)
            }
          })
        }

        if (ratingtagIds) {
          filter.push({
            "terms": {
              "stringRT": toSearch(ratingtagIds)
            }
          })
        }

        if (lat && lon && distance) {
          filter.push({
            "geo_distance": {
              "distance": distance,
              "location": {
                "lat": lat,
                "lon": lon
              }
            }
          })
        }

        if (keyword) {
          should.push({
            "multi_match": {
              "fields": ["name", "bigCategories", "categories", "intro", "address"],
              "query": keyword
            }
          })
          should.push({
            "prefix": {
              "name": {
                "value": keyword
              }
            }
          })
        }

        if (exceptNoKids) {
          filter.push({
            "match": {
              "noKids": false
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
          "from": lastId ? lastId : 0,
          "size": 10,
          "query": {
            "bool": {
              "filter": filter,
              "must": [
                {
                  "exists": {
                    "field": "thumbnail"
                  }
                }
              ],
              "should": should
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
        
        for(var i=0; i< searchedSplaces.length; i++){
          const saved = await client.save.findFirst({
            where: {
              savedUser: {
                id: loggedInUser.id
              },
              splaceId: parseInt(searchedSplaces[i].id)
            }
          })
          searchedSplaces[i].isSaved = saved != null ? true: false;
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
