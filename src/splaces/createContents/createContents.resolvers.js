import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createContents: protectedResolver(async (
      _,
      { title, splaceId, text, imageUrls, photoSize },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.splace.findFirst({
          where: {
            id: splaceId,
            owner: {
              id: loggedInUser.id
            },
            activate: true,
          },
          include: {
            categories: {
              select: {
                id: true
              }
            },
            bigCategories: {
              select: {
                id: true
              }
            },
          }
        });
        if (!ok) {
          return {
            ok: false,
            error: "ERROR5471"
          };
        }
        const a = await client.fixedContent.create({
          data: {
            title,
            splace: {
              connect: {
                id: splaceId
              }
            },
            text,
            photoSize,
            imageUrls
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
          error: "ERROR4471",
        };
      }
    }),
  }
};
