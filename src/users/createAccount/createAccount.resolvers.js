import bcrypt from "bcrypt";
import client from "../../client";
import redisClient from "../../redis"

function validateUsername(text) {
  const exp = /^[0-9a-z._]*$/;
  return exp.test(String(text).toLowerCase());
};

function validatePassword(text) {
  const exp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$?!@#$%^&*/])[A-Za-z\d$?!@#$%^&*/]{8,}$/;
  return exp.test(String(text).toLowerCase());
};

function validatePhone(text) {
  const exp = /^01([0|1|6|7|8|9])?([0-9]{7,8})$/;
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

        if(!validateUsername(username) || !validatePassword(password) || !validatePhone(phone)) {
          return {
            ok: false,
            error: "ERROR1104"
          }
        }

        const key = redisClient.get(phone)

        if(certificate!=key){
          return {
            ok: false,
            error: "ERROR1103"
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