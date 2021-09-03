import client from "../../client";

export default {
  Mutation: {
    deleteSplace: async (
      _,
      { splaceId }
    ) => {
      try {
        const a = await client.splace.delete({
          where: {
            splaceId
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
          error: "cant delete splace",
        };
      }
    },
  },
};