import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createSeries: protectedResolver(async (
      _,
      { title, isPrivate },
      { loggedInUser }
    ) => {
      try {
        if(title.length<1 && title.length<31){
          return {
            ok: false,
            error: "ERROR1311"
          }
        }
        const a = await client.series.create({
          data: {
            title,
            isPrivate,
            author: {
              connect: {
                id: loggedInUser.id
              }
            },
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4311",
        };
      }
    }),
  }
};
