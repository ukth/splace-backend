import client from "../../client";
import searchEngine from "../../opensearch";

function toSearch(arr){
  var narr = new Array();
  for(var i=0; i<arr.length; i++){
    narr.push("#"+arr[i]+"#")
  }
  return narr
}

export default {
  Query: {
    searchSplaces: async (_, { keyword, lat, long, distance, categoryIds, bigCategoryIds, specialTagIds, ratingTagIds }) => {
      try {
        var index_name = "splace"
        var query = {
          "query": {
            "match" : {
              "_all" : keyword
            },
            ...(lat != null && long != null && distance != null && {
              "geo_distance": {
                "distance": distance,
                "location": {
                  "lat": lat,
                  "lon": long
                }
              }
            }),
            ...(categoryIds != null && {
              "terms": {
                "stringC": toSearch(categoryIds)
              }
            }),
            ...(bigCategoryIds != null && {
              "terms": {
                "stringBC": toSearch(bigCategoryIds)
              }
            }),
            ...(specialTagIds != null && {
              "terms": {
                "stringST": toSearch(specialTagIds)
              }
            }),
            ...(ratingTagIds != null && {
              "terms": {
                "stringST": toSearch(ratingTagIds)
              }
            }),
          }
        }
        var response = await searchEngine.search({
          index: index_name,
          body: query
        })
        
        console.log(response)
        console.log(response._source);

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
