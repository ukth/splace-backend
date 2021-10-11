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

        if(!ok){
          return {
            ok: false,
            error: "raffle not exist"
          }
        }

        var mycredit = await client.user.findUnique({
          where: {
            id: loggedInUser.id
          }
        })

        mycredit = mycredit.credit

        if(mycredit < ok.credit){
          return {
            ok: false,
            error: "credit xxx"
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

        mycredit -= ok.credit
        
        const b = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            credit: mycredit
          }
        })

        //console.log(a);
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
