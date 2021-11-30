import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFolders: protectedResolver(async (_, { lastId, orderBy }, { loggedInUser }) => {
      try {
        let order = null;
        if(orderBy == "updatedAt") { 
          order = { updatedAt: "desc" } 
        } else if(orderBy == "name") { 
          order = { title: "desc" } 
        } else if(orderBy == "createdAt") { 
          order = { createdAt: "desc" } 
        } else {
          return {
            ok: false,
            error: "ERROR1###"
          }
        }

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
              },
              take: 1,
              orderBy: {
                createdAt: "desc"
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