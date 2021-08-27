import client from "../../client";

export default {
  Mutation: {
    deleteSeries: async (
      _,
      { seriesId }
    ) => {
      try {
        const a = await client.series.delete({
          where: {
            seriesId
          }
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant delete series",
        };
      }
    },
  },
};