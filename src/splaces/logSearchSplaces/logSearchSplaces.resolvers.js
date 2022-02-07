import client from "../../client";
import searchEngine from "../../opensearch";
import { protectedResolver } from "../../users/users.utils";

function toSearch(arr) {
  var narr = new Array();
  for (var i = 0; i < arr.length; i++) {
    narr.push("" + arr[i])
  }
  return narr
}

export default {
  Mutation: {
    logSearchSplaces: protectedResolver(async (_, { keyword }, { loggedInUser }) => {
      try {
        if (keyword.length != 0) {
          const time = new Date().toISOString().slice(0, 23)
          const table = dataset.table('likeLog')
          const rows = [
            {
              targetId: log.targetId,
              requestUserId: log.requestUserId,
              createdAt: time
            }
          ]
          const likeLog = await table.insert(rows)
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
    })
  },
};
