import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(async (
      _,
      { name, username, email, password: newPassword, profileMessage, profileImageUrl, url },
      { loggedInUser }
    ) => {
      try {
        if (username !== null) {
          const existId = await client.user.findFirst({
            where: {
              username
            },
          });
          if (existId !== null) {
            if (existId.id !== loggedInUser.id) {
              return {
                ok: false,
                error: "username/email already taken.",
              };
            }
          }
        }

        if (email !== null) {
          const existEmail = await client.user.findFirst({
            where: {
              email
            },
          });
          if (existEmail !== null) {
            if (existEmail.id !== loggedInUser.id) {
              return {
                ok: false,
                error: "username/email already taken.",
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