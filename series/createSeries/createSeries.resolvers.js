import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createSeries: protectedResolver(async (
      _,
      { title },
      { loggedInUser }
    ) => {
      try {
        const a = await client.series.create({
          data: {
            title,
            author: {
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
          error: "cant create series",
        };
      }
    }),
  }
};
