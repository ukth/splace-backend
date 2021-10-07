import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMySplace: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{
      const splaces = await client.splace.findMany({
        where: {
          ownerId: loggedInUser.id
        }
      })
      
      return {
        ok: true,
        splaces
      }
    } catch (e){
      console.log(e)
      return {
        ok: false,
        error: "cant get my splace"
      }
    }
    })
  }
}