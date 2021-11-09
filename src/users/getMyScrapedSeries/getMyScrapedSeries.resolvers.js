import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyScrapedSeries: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{
      const scraps = await client.scrapedSeries.findMany({
        where: {
          savedUserId: loggedInUser.id
        },
        include:{
          series: {
            include: {
              author: true,
              seriesElements: {
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
                },
                orderBy: {
                  order: "asc"
                }
              }
            }
          }
        }
      })

      const series = scraps.map(scrap => scrap.series)
      return {
        ok: true,
        series
      }
    } catch (e){
      console.log(e)
      return {
        ok: false,
        error: "ERROR4131"
      }
    }
    })
  }
}