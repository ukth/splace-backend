import bcrypt from "bcrypt";
import client from "../../client";
//import redisClient from "../../redis"
import send from "../../coolsms"

export default {
  Mutation: {
    createCertificate: async (
      _,
      { phone }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            phone
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "ERROR3103"
          }
        }

        const certificate = "";

        for(var i = 0; i++; i<6) {
          certificate += parseInt(Math.random() * 10);
        }
        //redis

        console.log(certificate)

        //redisClient.set(phone, certificate);

        //send message
        const a = send({
          messages: [
            {
              to: '01000000001',
              from: '029302266',
              text: '한글 45자, 영자 90자 이하 입력되면 자동으로 SMS타입의 메시지가 발송됩니다.'
            }
          ]
        })

        console.log(a);
        return {
          ok: true,
          certificate
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4107",
        };
      }
    },
  },
};