import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editSplaces: protectedResolver(async (
      _,
      { splaceId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
            activate: false,
          },
        });
        if (!ok || loggedInUser.authority != "root") {
          return {
            ok: false,
            error: "ERROR5472"
          };
        }

        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            activate: true
          }
        });

        for (var i = 0; i < 7; i++) {
          //console.log(1)
          const c = await client.timeSet.create({
            data: {
              day: i,
              splace: {
                connect: {
                  id: a.id
                }
              }
            }
          })
          //console.log(c)
        }

        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4413",
        };
      }
    }),
  }
};
