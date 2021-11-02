import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
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

        const logging = await client.seeCategoryLog.create({
          data: {
            userId: loggedInUser.id,
            categoryId: tagId,
            categoryType: 0
          }
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