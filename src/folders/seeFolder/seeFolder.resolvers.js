import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    seeFolder: protectedResolver(async (_, { folderId }, { loggedInUser }) => {
      try {
        const folder = await client.folder.findFirst({
          where: {
            id: folderId
          },
          include:{
            members: true,
            saves: {
              include: {
                splace: true,
              }
            }
          },
        })
        return {
          ok: true,
          folder
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "ERROR4B19"
        };
      }
    })
  }
}