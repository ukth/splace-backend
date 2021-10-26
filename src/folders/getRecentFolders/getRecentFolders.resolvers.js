import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFolders: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
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
          take: 5,
          orderBy: {
            updatedAt: "desc",
          },
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