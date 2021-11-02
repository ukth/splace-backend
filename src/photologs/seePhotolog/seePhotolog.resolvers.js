import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seePhotolog: protectedResolver(async (_, { photologId }, { loggedInUser }) => {
      try {
        const log = await client.photolog.findUnique({
          where: {
            id: photologId
          },
          include: {
            splace: true,
            categories: true,
            bigCategories: true,
            author: true,
            seriesElements: {
              include: {
                series: true
              }
            },
          },
        })
        if(log.isPrivate && log.authorId !== loggedInUser.id){
          return {
            ok: false,
            error: "ERROR5213"
          }
        }
        return {
          ok: true,
          log
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant see log"
        };
      }
    })
  }
}