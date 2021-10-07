import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyScrapedSeries: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{
      const series = await client.scrapedSeries.findMany({
        where: {
          savedUserId: loggedInUser.id
        }
      })
      return {
        ok: true,
        series
      }
    } catch (e){
      console.log(e)
      return {
        ok: false,
        error: "cant get my scrap"
      }
    }
    })
  }
}