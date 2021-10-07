import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyScrap: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{
      const logs = await client.scrapedLog.findMany({
        where: {
          savedUserId: loggedInUser.id
        }
      })
      const series = await client.scrapedSeries.findMany({
        where: {
          savedUserId: loggedInUser.id
        }
      })
      return {
        ok: true,
        logs,
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