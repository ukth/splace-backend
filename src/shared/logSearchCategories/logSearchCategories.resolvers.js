import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    logSearchCategories: protectedResolver(async (_, { keyword }, { loggedInUser }) => {
      try {
        const logging = await client.searchLog.create({
          data: {
            userId: loggedInUser.id,
            keyword: keyword
          }
        })
        return {
          ok: true,
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