import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSplacesByRatingtag: protectedResolver(async (_, { tagId, lastId }, { loggedInUser }) => {
      try {
        const splaces = await client.splace.findMany({
          where: {
            ratingtags: {
              some: {
                id: tagId
              }
            },
          },
          include: {
            categories: true,
            bigCategories: true,
          },
          take: 10,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            photologs: {
              _count: "desc"
            }
          },
        })

        return {
          ok: true,
          splaces
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