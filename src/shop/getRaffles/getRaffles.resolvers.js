import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getRaffles: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const raffles = await client.raffle.findMany({
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          raffles,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4J11"
        };
      }
    })
  }
}