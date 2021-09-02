import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFolders: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const folders = await client.folder.findMany({
          where: {
            members: {
              some: {
                userId: loggedInUser.userId
              },
            }
          },
          include:{
            members: true,
            saves: true,
          },
          take: 5,
          ...(lastId && { cursor: { folderId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            updatedAt: "asc",
          },
        })
        return {
          ok: true,
          folders: folders
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get folders"
        };
      }
    })
  }
}