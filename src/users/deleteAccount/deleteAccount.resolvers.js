import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteAccount: protectedResolver(async (
      _,
      __,
      { loggedInUser }
    ) => {
      try {
        const a = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            activate: false
          }
        });
        const b = await client.followLog.deleteMany({
          where: {
            OR: [
              {
                targetId: loggedInUser.id
              },
              {
                requestUserId: loggedInUser.id,
              }
            ]
          }
        })
        const c = await client.chatroomElement.deleteMany({
          where: {
            userId: loggedInUser.id,
          }
        })
        const d = await client.scrapedLog.deleteMany({
          where: {
            scrapedUserId: loggedInUser.id,
          }
        })
        const e = await client.scrapedSeries.deleteMany({
          where: {
            scrapedUserId: loggedInUser.id,
          }
        })
        
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4102",
        };
      }
    }),
  },
};