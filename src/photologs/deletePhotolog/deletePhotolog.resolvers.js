import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import searchEngine from "../../opensearch"
require("dotenv").config()

export default {
  Mutation: {
    deletePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const a = await client.photolog.findFirst({
          where: {
            id: photologId,
            author: {
              id: loggedInUser.id
            }
          }
        });
        if (!a) {
          return {
            ok: false,
            error: "ERROR5211"
          }
        }

        const c = await client.seriesElement.deleteMany({
          where: {
            photologId
          }
        })

        const d = await client.likeLog.deleteMany({
          where: {
            targetId: photologId
          }
        })

        if (!a.isPrivate && a.splaceId) {
          const splace = await client.splace.findFirst({
            where: {
              id: a.splaceId
            }
          })
          if (splace.activate) {
            var index_name = "photolog_search"+process.env.SEARCH_VERSION
            var response = await searchEngine.delete({
              id: photologId,
              index: index_name,
            })

            if (response.body.result != "deleted") {
              return {
                ok: false,
                error: "ERROR4419"
              }
            }
          }
        }

        const b = await client.photolog.delete({
          where: {
            id: photologId,
          }
        })
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4211",
        };
      }
    }),
  },
};