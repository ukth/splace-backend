import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFolders: protectedResolver(async (_, { lastId }, { loggedInUser, orderBy }) => {
      try {
        const order = (orderBy == "updatedAt") ? { updatedAt: "desc" } : { title: "desc" } 
        const folders = await client.folder.findMany({
          where: {
            members: {
              some: {
                id: loggedInUser.id
              },
            }
          },
          include:{
            members: true,
            saves: {
              include: {
                splace: true,
              }
            },
          },
          take: 10,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: order
        })
        return {
          ok: true,
          folders: folders
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B16"
        };
      }
    })
  }
}