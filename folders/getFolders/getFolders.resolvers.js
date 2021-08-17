import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getFolders: protectedResolver(async (_, { seriesId, lastId }, { loggedInUser }) => {
      const folders = await client.folder.findMany({
        where: {
          members: {
            some:{
              userId: loggedInUser.userId
            },
          }
        },
        take: 5,
        ...(lastId && { cursor: { photologId: lastId } }),
        skip: lastId ? 1 : 0,
        orderBy: {
          createdAt: "asc",
        },
      })
      return folders;
    })
  }
}