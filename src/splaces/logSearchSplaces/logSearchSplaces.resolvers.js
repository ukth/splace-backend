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
    logSearchSplaces: async (_, { keyword }) => {
      try {
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
