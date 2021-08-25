import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Mutation: {
    editSplaces: protectedResolver(async (
      _,
      { splaceId, name, geolog, geolat, address, timeSetIds, itemIds, badgeIds, ratingtagIds, hashtags },
      { loggedInUser }
    ) => {
      try {
        const previous = await client.splace.findUnique({ where: { splaceId } });
        if (previous.ownerId != loggedInUser.userId) {
          return {
            ok: false,
            error: "you are not the owner of this splace!"
          };
        }
        const a = await client.splace.update({
          where: {
            splaceId
          },
          data: {
            name,
            geolat,
            geolog,
            address,
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
            ...(ratingtagIds != null && {
              ratingtags: {
                connect: ratingtagIds.map(ratingtagId => ({
                  ratingtagId
                })),
              },
            }),
            ...(badgeIds != null && {
              badges: {
                connect: badgeIds.map(badgeId => ({
                  badgeId
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
        console.log(a);
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
