import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    likePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const b = await client.photolog.findUnique({
          where: {
            id: photologId
          },
        })
        if(b.isPrivate){
          return {
            ok: false,
            error: "ERROR1212"
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
        const log = await client.likeLog.create({
          data: {
            target: {
              connect: {
                id: photologId
              }
            },
            requestUser: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        })
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4217",
        };
      }
    }),
  }
};
