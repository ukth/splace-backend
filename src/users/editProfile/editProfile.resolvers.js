import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import dayjs from 'dayjs';

function validateUsername(text) {
  const exp = /^[0-9a-z._]*$/;
  return exp.test(String(text).toLowerCase());
};

function validateUrl(text) {
  const exp = /^[0-9a-z_\-.&?=:\/]*$/;
  return exp.test(String(text).toLowerCase());
};

function validateEmail(text) {
  const exp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  return exp.test(String(text).toLowerCase());
};

function validatePassword(text) {
  const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$?!@#$%^&*/])[A-Za-z\d$?!@#$%^&*/]{8,}$/;
  return exp.test(String(text).toLowerCase());
};

export default {
  Mutation: {
    editProfile: protectedResolver(async (
      _,
      { name, username, birthDay, email, password: newPassword, profileMessage, profileImageUrl, url },
      { loggedInUser }
    ) => {
      try {
        if (birthDay) {
          const BDay = dayjs(parseInt(birthDay))
          birthDay = BDay.format()
        }
        if (username) {
          const existId = await client.user.findFirst({
            where: {
              username
            },
          });
          //console.log(existId)
          if (existId !== null) {
            if (existId.id !== loggedInUser.id) {
              return {
                ok: false,
                error: "ERROR3101",
              };
            }
          }
        }
        
        //console.log(email)
        if (email) {
          const existEmail = await client.user.findFirst({
            where: {
              email
            },
          });
          //console.log(existEmail);
          if (existEmail !== null) {
            if (existEmail.id !== loggedInUser.id) {
              return {
                ok: false,
                error: "ERROR3102",
              };
            }
          }
        }

        if((username && !validateUsername(username)) || (newPassword && !validatePassword(newPassword)) || (email && !validateEmail(email)) || (url && !validateUrl(url))){
          return {
            ok: false,
            error: "ERROR1104"
          }
        }

        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            name,
            username,
            email,
            profileMessage,
            url,
            ...(birthDay && { birthDay: birthDay }),
            ...(hashedPassword && { password: hashedPassword }),
            ...(profileImageUrl && { profileImageUrl: profileImageUrl }),
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