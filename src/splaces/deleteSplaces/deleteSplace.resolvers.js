import client from "../../client";

export default {
  Mutation: {
    deleteSplace: async (
      _,
      { splaceId },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({ where: { id: splaceId } });
        if (previous.ownerId != loggedInUser.id) {
          return {
            ok: false,
            error: "you are not the owner of this splace!"
          };
        }
        const a = await client.splace.delete({
          where: {
            id: splaceId
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant delete splace",
        };
      }
    },
  },
};