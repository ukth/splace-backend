import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    suggestTags: protectedResolver(async (_, __, { loggedInUser }) => {
      try {

        const ratingtagIds = []
        const bigCategoryIds = []

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