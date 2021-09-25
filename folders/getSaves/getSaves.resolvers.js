import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getSaves: protectedResolver(async (_, { folderId, lastId }, { loggedInUser }) => {
      try {
        const saves = await client.save.findMany({
          where: {
            folderId
          },
          include:{
            splace:true,
          },
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "asc",
          },
        })
        return {
          ok: true,
          saves
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get saves"
        };
      }
    })
  }
}