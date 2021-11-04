import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyScrapedLog: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{
      const scraps = await client.scrapedLog.findMany({
        where: {
          savedUserId: loggedInUser.id
        },
        include: {
          photolog: {
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
            }
          }
        }
      })
      
      const logs = scraps.map(scrap => scrap.photolog)

      return {
        ok: true,
        logs,
      }
    } catch (e){
      console.log(e)
      return {
        ok: false,
        error: "ERROR4121"
      }
    }
    })
  }
}