import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
import redisClient from "../../redis"
const { promisify } = require('util');
require("dotenv").config();


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
        const now = new Date();
        const duration = 600000;

        const token = await jwt.sign({ phoneOk: phone, iat: now.getTime(), eat: now.getTime() + duration }, process.env.SECRET_KEY);
        //console.log(a);
        return {
          ok: true,
          token
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