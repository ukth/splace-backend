import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadMoment: protectedResolver(async (
      _,
      { text, splaceId, videoUrl, title },
      { loggedInUser }
    ) => {
      try {
        if(text.length > 200) {
          return {
            ok: false,
            error: "ERROR1O11"
          }
        }
        const a = await client.moment.create({
          data: {
            title,
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
