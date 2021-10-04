import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    editSplaces: protectedResolver(async (
      _,
      { splaceId, name, geolog, geolat, address, timeSetIds, itemIds, hashtags, kids, parking, pets},
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({ where: { id: splaceId } });
        if (previous.ownerId != loggedInUser.id) {
          return {
            ok: false,
            error: "you are not the owner of this splace!"
          };
        }
        const a = await client.splace.update({
          where: {
            id: splaceId
          },
          data: {
            name,
            geolat,
            geolog,
            address,
            kids,
            parking,
            pets,
            ...(timeSetIds != null && {
              timeSets: {
                connect: timeSetIds.map(timeSetId => ({
                  timeSetId
                })),
              },
            }),
            ...(itemIds != null && {
              items: {
                connect: itemIds.map(itemId => ({
                  itemId
                })),
              },
            }),
            ...(hashtags != null && {
              hashtags: {
                connectOrCreate: hashtags.map(hashtag => ({
                  create: { name: hashtag },
                  where: { name: hashtag }
                }))
              }
            }),
          }
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant edit splace",
        };
      }
    }),
  }
};
