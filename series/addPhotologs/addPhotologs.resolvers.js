import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addPhotologs: protectedResolver(async (_, { photologIds, seriesId }, { loggedInUser }) => {
      try {
        const ok = await client.series.findUnique({ where: { seriesId } })
        //console.log(ok);
        if (ok.authorId != loggedInUser.userId) {
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
              connect: photologIds.map(photologId => ({
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
        //console.log(e);
        return {
          ok: false,
          error: "cant add photolog",
        };
      }
    }),
  },
};