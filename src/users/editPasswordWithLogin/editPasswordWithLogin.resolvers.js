import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
import { protectedResolver } from "../../users/users.utils";
require("dotenv").config();


function validatePassword(text) {
  const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$?!@#$%^&*/])[A-Za-z\d$?!@#$%^&*/]{8,15}$/;
  return exp.test(String(text).toLowerCase());
};

export default {
  Mutation: {
    editPasswordWithLogin: protectedResolver(async (
      _,
      { newPassword, password },
      { loggedInUser }
    ) => {
      try {
        if (!validatePassword(newPassword) || password == newPassword) {
          return {
            ok: false,
            error: "ERROR1104"
          }
        }

        const hashedPassword = await bcrypt.hash(password,10)        
        const passwordOk = await bcrypt.compare(password, loggedInUser.password)
        if(!passwordOk){
          return {
            ok: false,
            error: "ERROR1###"
          }
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            password: hashedNewPassword,
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
    })
  }
};