import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeSplace: protectedResolver(async (_, { splaceId }, { loggedInUser }) => {
      try {
        const splace = await client.splace.findFirst({
          where: {
            id: splaceId,
            activate: false,
          },
          include:{
            timeSets: true,
            ratingtags: true,
            categories: true,
            bigCategories: true,
            bigCategories: true,
            fixedContents: true,
          },
        })
        return {
          ok: true,
          splace
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4B14"
        };
      }
    })
  }
}