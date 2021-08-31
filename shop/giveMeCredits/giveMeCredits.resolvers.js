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
        }).then(function (paymentData) {
          return paymentData
        }).catch(function (error) {
          console.log(error);
          return null;
        });

        const paymentlog = await client.paymentLog.findUnique({ where: { merchantUId } });
        const custom_data = JSON.parse(paymentData.custom_data)
        console.log(custom_data)

        if (paymentData != null && amount === paymentData.amount && paymentlog === null && merchantUId === paymentData.merchant_uid
          && custom_data.userId === loggedInUser.userId && paymentData.status === 'paid'
          && credit === custom_data.credit && amount === credit*39) {

          const a = await client.paymentLog.create({
            data: {
              customerId: loggedInUser.userId,
              merchantUId,
              credit
            }
          });
          console.log(a);

          const b = await client.user.update({
            where: { userId: loggedInUser.userId },
            data: {
              credit: loggedInUser.credit+custom_data.credit
            }
          })
          console.log(b);

          return {
            ok: true,
          }
        } else {
          return {
            ok: false,
            error: "fuck you"
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
