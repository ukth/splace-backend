import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteSeries: protectedResolver(async (
      _,
      { seriesId }
    ) => {
      try {
        const a = await client.series.delete({
          where: {
            seriesId
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant delete series",
        };
      }
    }),
  },
};