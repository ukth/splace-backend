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
            username,
            activate: true,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "ERROR2101",
          };
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return {
            ok: false,
            error: "ERROR1101",
          };
        }
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return {
          ok: true,
          token,
          user: user,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4106"
        }
      }
    },
  },
};