import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    suggestTags: protectedResolver(async (_, __, { loggedInUser }) => {
      try {

        var ratingtagIds = [1,2,3,4]
        var bigCategoryIds = [1,2,3,4,5,6,7,8,9,10,11,12]

        const ratingtags = await client.ratingtag.findMany({
          where: {
            OR: ratingtagIds.map(ratingtagId => {
                id: ratingtagId
              })
          },
          select: {
            id: true,
            name: true,
            color: true
          },
        })
        console.log(bigCategoryIds)
        console.log({
          OR: bigCategoryIds.map(bigCategoryId => {
              id: bigCategoryId
            })
        })
        const bigCategories = await client.bigCategory.findMany({
          where: {
            OR: bigCategoryIds.map(bigCategoryId => {
                id: bigCategoryId
              })
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