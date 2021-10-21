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

        console.log(redisClient.get(phone))

        const key = redisClient.get(phone, function (err, reply) {
          //console.log(err)
          console.log(reply)
          console.log(reply.toString())
          return reply.toString();
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