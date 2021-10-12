import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import dayjs from 'dayjs';

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
                error: "username already taken.",
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
                error: "email already taken.",
              };
            }
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
          error: "cant update profile"
        }
      }
    })
  }
};