import client from "../../client";

export default {
  Mutation: {
    deleteFolder: async (
      _,
      { userId }
    ) => {
      try {
        const a = await client.folder.delete({
          where: {
            folderId
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
          error: "cant delete folder",
        };
      }
    },
  },
};