import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
require("dotenv").config();


function validatePassword(text) {
  const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$?!@#$%^&*/])[A-Za-z\d$?!@#$%^&*/]{8,15}$/;
  return exp.test(String(text));
};

export default {
  Mutation: {
    editPassword: async (
      _,
      { password: newPassword, token },
      { loggedInUser }
    ) => {
      try {
        if (!validatePassword(newPassword)) {
          return {
            ok: false,
            error: "ERROR1104"
          }
        }

        const { phoneOk, iat, eat } = await jwt.verify(token, process.env.SECRET_KEY);

        const user = await client.user.findFirst({
          where: {
            phone: phoneOk
          }
        })
        const now = new Date()
        
        if (!user || iat > now.getTime() || eat < now.getTime()) {
          return {
            ok: false,
            error: "ERROR1105"
          }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await client.user.update({
          where: {
            id: user.id,
          },
          data: {
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4103"
        }
      }
    }
  }
};