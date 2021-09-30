import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import pubsub from "../../pubsub";
import { NEW_LIKED } from "../../constants";

export default {
  Mutation: {
    likePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      /*const isLiked = await client.photolog.findUnique({ where: { photologId } })
      .likedUser({
        where: { userId: loggedInUser.userId }
      })
      if(isLiked.length == 1){
        return {
          ok: false,
          error: "you already liked this photolog"
        }
      }*/
      try {
        const b = await client.photolog.findUnique({
          where: {
            id: photologId
          },
        })
        if(b.isPrivate){
          return {
            ok: false,
            error: "you can't like private photolog"
          }
        }
        const a = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            likedPhotologs: {
              connect: {
                id: photologId
              }
            }
          },
        });
        pubsub.publish(NEW_LIKED, { newLiked: { photolog: b, user: loggedInUser }})
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant like",
        };
      }
    }),
  }
};
