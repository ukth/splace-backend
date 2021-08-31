import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    buyItem: protectedResolver(async (
      _,
      { customerId, merchantUId, amount },
      { loggedInUser }
    ) => {
      try {
        const a = await client.paymentLog.create({
          data: {
            customerId,
            merchantUId,
            amount
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
          error: "cant create paymentlog",
        };
      }
    }),
  }
};
