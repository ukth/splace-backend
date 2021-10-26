import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSplacesByRatingtag: protectedResolver(async (_, { tagId, lastId }, { loggedInUser }) => {
      try {
        const logs = await client.splace.findMany({
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
            specialtags: true,
          },
          take: 5,
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
          logs: logs
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