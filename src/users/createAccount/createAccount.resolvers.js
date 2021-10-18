import bcrypt from "bcrypt";
import client from "../../client";

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
    createAccount: async (
      _,
      { username, password, phone }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            username
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "ERROR3101"
          }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const a = await client.user.create({
          data: {
            username,
            password: hashedPassword,
            phone
          },
        });
        const f = await client.folder.create({
          data: {
            members: {
              connect: {
                id: a.id
              }
            },
            title: "저장된 항목"
          }
        })
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4101",
        };
      }
    },
  },
};