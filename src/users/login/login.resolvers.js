import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import searchEngine from "../../opensearch";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findFirst({
          where: {
            OR: [
              {
                username
              },
              {
                email: username
              },
            ],
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect password.",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        const result = await searchEngine.search({
          index: 'user',
          body: {
            query: {
              match: { id: 1 }
            }
          }
        })
        console.log(result);

        return {
          ok: true,
          token,
          user: user,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "login failed"
        }
      }
    },
  },
};