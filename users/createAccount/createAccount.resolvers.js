import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation: {
      createAccount: async (
        _,
        { firstname, lastname, username, email, password }
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
          throw new Error("This username/password is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const a = await client.user.create({
          data: {
            username,
            email,
            firstname,
            lastname,
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