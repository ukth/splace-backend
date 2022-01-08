import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unblockUser: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        const target = await client.user.findUnique({ where: { id: targetId } });
        if (targetId === loggedInUser.id) {
          return {
            ok: false,
            error: "ERROR1113"
          }
        }
        if (!target) {
          return {
            ok: false,
            error: "ERROR2116"
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            blockingUser: {
              disconnect: {
                id: targetId
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
          error: "ERROR4117",
        };
      }
    }),
  },
};