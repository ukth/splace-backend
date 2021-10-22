import bcrypt from "bcrypt";
import client from "../../client";
import redisClient from "../../redis"
const { promisify } = require('util');


export default {
  Mutation: {
    checkCertificate: async (
      _,
      { certificate, phone }
    ) => {
      try {
        const getAsync = promisify(redisClient.get).bind(redisClient);

        const reply = await getAsync(phone)

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