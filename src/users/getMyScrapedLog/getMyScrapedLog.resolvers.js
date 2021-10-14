import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMyScrapedLog: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{
      const logs = await client.scrapedLog.findMany({
        where: {
          savedUserId: loggedInUser.id
        }
      })

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