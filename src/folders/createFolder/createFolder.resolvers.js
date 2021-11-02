import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createFolder: protectedResolver(async (
      _,
      { title },
      { loggedInUser }
    ) => {
      try {
        const num = await client.folder.count({
          where: {
            members: {
              some: {
                id: loggedInUser.id
              }
            }
          }
        })
        if(num > 98) {
          return {
            ok: false,
            error: "ERROR"
          }
        }
        const a = await client.folder.create({
          data: {
            title,
            members: {
              connect: {
                id: loggedInUser.id
              }
            },
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4B13",
        };
      }
    }),
  }
};
