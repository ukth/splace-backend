import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getBigCategories: protectedResolver(async (_, __, { loggedInUser }) => {
      try {

        const bigCategories = await client.bigCategory.findMany()
        return {
          ok: true,
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