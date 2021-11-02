import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    showPhotologs: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        await client.photolog.update({
          where: {
            id: targetId
          },
          data: {
            hiddenUsers: {
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
          error: "ERROR4219",
        };
      }
    }),
  },
};