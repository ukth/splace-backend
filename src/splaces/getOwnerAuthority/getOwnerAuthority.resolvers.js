import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    getOwnerAuthority: protectedResolver(async (
      _,
      { birthDay, splaceId, corpNum, name, imageUrls },
      { loggedInUser }
    ) => {
      try {
        const BDay = dayjs(parseInt(birthDay))
        birthDay = BDay.format()
        const previous = await client.splace.findFirst({ where: { id: splaceId, activate: true, } });
        if (previous.ownerId) {
          return {
            ok: false,
            error: "ERROR3411"
          };
        }
        const a = await client.ownerInfo.create({
          data: {
            userId: loggedInUser.id,
            splaceId,
            corpNum,
            birthDay,
            name,
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
