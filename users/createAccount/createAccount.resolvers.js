import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "this username/email is already taken!"
          }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const a = await client.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
          },
        });
        console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant create account",
        };
      }
    },
  },
};