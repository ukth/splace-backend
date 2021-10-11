import { hash } from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    searchCategories: protectedResolver(async (_, { keyword, lastHashId }, { loggedInUser }) => {
      try {
        const specialtags = await client.specialtag.findMany({
          where: {
            name: {
              startsWith: keyword
            }
          },
          select: {
            id: true,
            name: true,
            color: true
          },
        })
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
          take: 40,
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
          specialtags,
          bigCategories,
          categories,
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "can't get tags"
        };
      }
    })
  }
}