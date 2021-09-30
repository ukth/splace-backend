import client from "../../client";
import iamport from "../../iamport";
require("dotenv").config();
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    giveMeCredits: protectedResolver(async (
      _,
      { impUId, merchantUId, amount, credit },
      { loggedInUser }
    ) => {
      try {

        const paymentData = await iamport.payment.getByImpUid({
          imp_uid: impUId
        })

        const paymentlog = await client.paymentLog.findUnique({ where: { merchantUId } });
        const custom_data = JSON.parse(paymentData.custom_data)


        if (paymentData != null && amount === paymentData.amount && paymentlog === null && merchantUId === paymentData.merchant_uid
          && custom_data.userId === loggedInUser.id && paymentData.status === 'paid'
          && credit === custom_data.credit && amount === credit*39) {

          
          //console.log(a);

          const b = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              credit: loggedInUser.credit+custom_data.credit
            }
          })
          //console.log(b);

          const a = await client.paymentLog.create({
            data: {
              customerId: loggedInUser.id,
              merchantUId,
              credit
            }
          });

          return {
            ok: true,
          }
        } else {
          return {
            ok: false,
            error: "invalid request"
          }
        }

      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant give you credits",
        };
      }
    }),
  }
};
