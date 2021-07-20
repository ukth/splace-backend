import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation: {
      createAccount: async (
        _,
        { firstName, lastName, userName, email, password }
      ) => {
        try {
          const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                user_name: userName,
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
        await client.user.create({
          data: {
            user_name: userName,
            email,
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant create account",
        };
      }
    },
  },
};