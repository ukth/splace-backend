import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteFolder: protectedResolver(async (
      _,
      { folderId }
    ) => {
      try {
        const a = await client.folder.delete({
          where: {
            folderId
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
          error: "cant delete folder",
        };
      }
    }),
  },
};