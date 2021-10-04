import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    removePhotologs: protectedResolver(async (_, { photologIds, seriesId }, { loggedInUser }) => {
      try {
        const ok = await client.series.findUnique({ where: { id: seriesId } })
        //console.log(ok);
        if (ok.authorId != loggedInUser.id) {
          return {
            ok: false,
            error: "you are not author."
          };
        }
        await client.series.update({
          where: {
            id: seriesId
          },
          data: {
            photologs: {
              disconnect: photologIds.map(photologId => ({
                id: photologId
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