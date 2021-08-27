import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    removePhotologs: protectedResolver(async (_, { photologIds, seriesId }, { loggedInUser }) => {
      try {
        const ok = await client.series.findUnique({ where: { seriesId } })
          .author({
            where: { userId: loggedInUser.userId }
          });
        console.log(ok);
        if (ok == null) {
          return {
            ok: false,
            error: "you are not author."
          };
        }
        await client.series.update({
          where: {
            seriesId
          },
          data: {
            photologs: {
              disconnect: photologIds.map(photologId => ({
                photologId
              }))
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant remove photolog",
        };
      }
    }),
  },
};