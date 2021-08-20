import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    scrapLog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.scrap.create({
          data: {
            photolog: {
              connect: {
                photologId
              }
            },
            savedUser: {
              connect: {
                userId: loggedInUser.userId
              }
            },
          },
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant scrap photolog",
        };
      }
    }),
  }
};
