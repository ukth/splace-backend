import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    searchCategories: protectedResolver(async (_, { keyword, lastHashId }, { loggedInUser }) => {
      try {
        const categories = await client.category.findMany({
          where: {
            name: {
              startsWith: keyword
            }
          },
          select: {
            id: true,
            name: true
          },
          take: 20,
          ...(lastHashId && { cursor: { id: lastHashId } }),
          skip: lastHashId ? 1 : 0,
        })
        const bigCategories = await client.bigCategory.findMany({
          where: {
            name: {
              startsWith: keyword
            }
          },
          select: {
            id: true,
            name: true
          },
        })
        return {
          ok: true,
          bigCategories,
          categories,
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