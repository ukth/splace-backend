import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    suggestTags: protectedResolver(async (_, __, { loggedInUser }) => {
      try {

        const ratingtagIds = [1,2,3,4]
        const bigCategoryIds = [1,2,3,4,5,6,7,8,9,10,11,12]

        const ratingtags = await client.ratingtag.findMany({
          where: {
            OR: [
              ratingtagIds.map(id => {
                id
              })
            ]
          },
          select: {
            id: true,
            name: true,
            color: true
          },
        })
        const bigCategories = await client.bigCategory.findMany({
          where: {
            OR: [
              bigCategoryIds.map(id => {
                id
              })
            ]
          },
          select: {
            id: true,
            name: true,
          },
        })
        return {
          ok: true,
          ratingtags,
          bigCategories,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4C11"
        };
      }
    })
  }
}