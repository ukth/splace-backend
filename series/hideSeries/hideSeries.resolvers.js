import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    hideSeries: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        /*const isFollowing = await client.user.findUnique({ where: { userId: loggedInUser.userId } })
          .followings({
            where: { userId: targetId }
          })
        if (isFollowing.length == 1) {
          return {
            ok: false,
            error: "you already follow this user"
          }
        }*/
        const target = await client.series.findUnique({ where: { seriesId: targetId } });
        if (!target) {
          return {
            ok: false,
            error: "That series does not exist."
          };
        }
        if(target.authorId == loggedInUser.userId){
          return {
            ok: false,
            error: "you cant hide your photologs"
          }
        }
        await client.user.update({
          where: {
            userId: loggedInUser.userId
          },
          data: {
            hiddenSeries: {
              connect: {
                seriesId: targetId
              }
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant hide photologs",
        };
      }
    }),
  },
};