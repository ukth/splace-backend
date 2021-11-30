import client from "../../client";
import iamport from "../../iamport";
require("dotenv").config();
import { protectedResolver } from "../../users/users.utils";
import dayjs from 'dayjs';

export default {
  Mutation: {
    giveMeMoney: protectedResolver(async (
      _,
      { impUId, merchantUId, reason, },
      { loggedInUser }
    ) => {
      try {

        const paymentData = await iamport.payment.getByImpUid({
          imp_uid: impUId
        })
        //console.log(paymentData)

        const paymentlog = await client.paymentLog.findUnique({ where: { merchantUId } });
        const custom_data = JSON.parse(paymentData.custom_data)

        //console.log(paymentlog);
        //console.log(custom_data);
        //console.log(paymentData);

        //console.log(paymentData.paid_at)

        //const paid = dayjs(parseInt(paymentData.paid_at*1000))
        //const paidAt = paid.format()

        //console.log(paidAt)

        const buyRaffleLog = await client.buyRaffleLog.findFirst({
          where: {
            createdAt: {
              gte: paidAt
            }
          }
        })

        if (buyRaffleLog) {
          return {
            ok: false,
            error: "ERROR3QJ1"
          }
        }

        if (paymentData != null && paymentlog.creditGiven && merchantUId === paymentData.merchant_uid
          && custom_data.userId === loggedInUser.id && paymentData.status === 'paid'
          && paymentData.cancel_history.length === 0 && loggedInUser.credit >= custom_data.credit) { //buylog check \

          const cancelResult = await iamport.payment.cancel({
            imp_uid: impUId,
            merchant_uid: merchantUId,
            reason: reason
          })

          if (cancelResult == null) {
            return {
              ok: false,
              error: "ERROR4Q11"
            }
          }

          //console.log(cancelResult);


          //console.log(a);

          const b = await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              credit: loggedInUser.credit - custom_data.credit
            }
          })
          //console.log(b);

          const a = await client.paymentLog.update({
            where: {
              merchantUId
            },
            data: {
              creditGiven: false
            }
          });

          return {
            ok: true,
          }

        } else {
          return {
            ok: false,
            error: "ERROR1Q12"
          }
        }

      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4Q14",
        };
      }
    }),
  }
};
