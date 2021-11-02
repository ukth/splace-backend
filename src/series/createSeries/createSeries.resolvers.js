import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createSeries: protectedResolver(async (
      _,
      { title, isPrivate, photologIds },
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
        

        if (photologIds.length > 98) {
          return {
            ok: false,
            error: "ERROR1313"
          }
        }

        for (var i = 0; i < photologIds.length; i++) {
          const b = await client.photolog.findUnique({
            where: {
              id: photologIds[i]
            },
            include: {
              seriesElements: true,
            }
          })
          if (b.seriesElements.length > 10) {
            return {
              ok: false,
              error: "ERROR1216"
            }
          }
        }

        for (var i = 0; i < photologIds.length; i++) {
          const element = await client.seriesElement.create({
            data: {
              photolog: {
                connect: {
                  id: photologIds[i]
                }
              },
              series: {
                connect: {
                  id: a.id
                }
              },
              order: i + 1
            }
          })
        }
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
