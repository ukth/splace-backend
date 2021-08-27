import client from "../../client";

export default {
  Mutation: {
    deleteAccount: async (
      _,
      { userId }
    ) => {
      try {
        const a = await client.user.delete({
          where: {
            userId
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
          error: "cant delete account",
        };
      }
    },
  },
};