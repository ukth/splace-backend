import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getMySaves: protectedResolver(async (_, { folderId, lastId }, { loggedInUser }) => {
      try {
        const saves = await client.save.findMany({
          where: {
            savedUser: {
              id: loggedInUser.id
            }
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
        console.log(e);
        return {
          ok: false,
          error: "cant get my saves"
        };
      }
    })
  }
}