import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logGetSplacesByRatingtag: protectedResolver(async (_, { tagId }, { loggedInUser }) => {
      try {
        const logging = await client.seeCategoryLog.create({
          data: {
            userId: loggedInUser.id,
            categoryId: tagId,
            categoryType: 0
          }
        })

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4231"
        };
      }
    })
  }
}