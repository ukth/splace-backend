import client from "../../client";
import jwt from "jsonwebtoken";
require("dotenv").config();


export default {
  Query: {
    getUsername: async (
      _,
      { token }
    ) => {
      try {
        const { phoneOk, iat, eat } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findFirst({
          where: {
            phone: phoneOk,
            activate: true
          }
        })
        const now = new Date()
        
        if (!user || iat > now.getTime() || eat < now.getTime()) {
          return {
            ok: false,
            error: "ERROR1105"
          }
        }

        //console.log(a);
        return {
          ok: true,
          username: user.username
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4101",
        };
      }
    },
  },
};