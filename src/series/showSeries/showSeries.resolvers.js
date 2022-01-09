import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    showSeries: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        await client.series.update({
          where: {
            id: targetId
          },
          data: {
            hiddenBy: {
              disconnect: {
                id: loggedInUser.id
              }
            }
          }
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4317",
        };
      }
    }),
  },
};