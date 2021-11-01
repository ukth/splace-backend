import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeSplace: protectedResolver(async (_, { splaceId }, { loggedInUser }) => {
      try {
        const splace = await client.splace.findFirst({
          where: {
            id: splaceId,
            activate: true,
          },
          include:{
            timeSets: true,
            ratingtags: true,
            categories: true,
            bigCategories: true,
            fixedContents: true,
            owner: true
          },
        })
        console.log(splace)
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