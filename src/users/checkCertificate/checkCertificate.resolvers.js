import bcrypt from "bcrypt";
import client from "../../client";
import redisClient from "../../redis"

export default {
  Mutation: {
    checkCertificate: async (
      _,
      { certificate, phone }
    ) => {
      try {
        const key = redisClient.get(phone, (err, reply) => {
          console.log(err);
          return reply;
        });

        if(certificate!=key){
          return {
            ok: false,
            error: "ERROR1103"
          }
        }
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4108",
        };
      }
    },
  },
};