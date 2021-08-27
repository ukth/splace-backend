import client from "../../client";

export default {
  Mutation: {
    deletePhotolog: async (
      _,
      { photologId }
    ) => {
      try {
        const a = await client.photolog.delete({
          where: {
            photologId
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
          error: "cant delete photolog",
        };
      }
    },
  },
};