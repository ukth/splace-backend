import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadMoment: protectedResolver(async (
      _,
      { text, splaceId, videoUrl },
      { loggedInUser }
    ) => {
      try {
        const a = await client.moment.create({
          data: {
            author: {
              connect: {
                id: loggedInUser.id
              }
            },
            videoUrl,
            text,
            ...(splaceId != null && {
              splace: {
                connect: {
                  id: splaceId
                }
              },
            }),
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
          error: "ERROR4O11",
        };
      }
    }),
  }
};
