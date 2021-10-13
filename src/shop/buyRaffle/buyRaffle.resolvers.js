import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    buyRaffle: protectedResolver(async (
      _,
      { raffleId },
      { loggedInUser }
    ) => {
      try {
        const ok = await client.raffle.findFirst({
          where: {
            id: raffleId
          }
        })

        if (!ok) {
          return {
            ok: false,
            error: "ERROR2K11"
          }
        }

        const exist = await client.buyRaffleLog.findFirst({
          where: {
            raffleId,
            customerId: loggedInUser.id
          }
        })

        if(exist){
          return {
            ok: false,
            error: "ERROR3K11"
          }
        }
        var mycredit = await client.user.findUnique({
          where: {
            id: loggedInUser.id
          }
        })

        const totalcredit = mycredit.credit + mycredit.lockedCredit

        if (totalcredit < ok.credit) {
          return {
            ok: false,
            error: "ERROR1K11"
          }
        }

        const a = await client.buyRaffleLog.create({
          data: {
            customer: {
              connect: {
                id: loggedInUser.id
              }
            },
            raffle: {
              connect: {
                id: raffleId
              }
            },
            credit: ok.credit
          }
        });

        if (mycredit.lockedCredit >= ok.credit) {
          const newCredit = mycredit.lockedCredit - ok.credit
          //console.log(newCredit)
          const b = await client.user.update({
            where: {
              id: loggedInUser.id
            },
            data: {
              lockedCredit: newCredit
            }
          })
        }

        else {
          const payCredit = ok.credit - mycredit.lockedCredit
          const newCredit = mycredit.credit - payCredit
          //console.log(newCredit)
          const b = await client.user.update({
            where: {
              id: loggedInUser.id
            },
            data: {
              lockedCredit: 0,
              credit: newCredit
            }
          })
        }

        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4K11",
        };
      }
    }),
  }
};
