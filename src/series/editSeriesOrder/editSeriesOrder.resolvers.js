import { Connect } from "aws-sdk";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editSeriesOrder: protectedResolver(async (_, { photologIds, seriesId }, { loggedInUser }) => {
      try {
        const ok = await client.series.findFirst({
          where: {
            id: seriesId,
            author: {
              id: loggedInUser.id
            }
          },
          include: {
            seriesElements: true
          }
        })
        //console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5311"
          };
        }
        if (photologIds.length > 98) {
          return {
            ok: false,
            error: "ERROR1313"
          }
        }

        const deleteAll = await client.seriesElement.deleteMany({
          where: {
            seriesId
          }
        })

        for (var i = 0; i < photologIds.length; i++) {
          const a = await client.photolog.findUnique({
            where: {
              id: photologIds[i]
            },
            include: {
              seriesElements: true,
            }
          })
          if (a.seriesElements.length > 10) {
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
                  id: seriesId
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
          error: "ERROR4321",
        };
      }
    }),
  },
};