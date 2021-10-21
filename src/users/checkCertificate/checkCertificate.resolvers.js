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

        const reply = await redisClient.get(phone)

        if(certificate!=reply){
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