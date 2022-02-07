import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
const { promisify } = require('util');
require("dotenv").config();
import { validateUsername, validatePassword, validatePhone } from "../../re"

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, password, phone, token, marketingAgree }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username
              },
              {
                phone
              }
            ],
            activate: true
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "ERROR3101"
          }
        }

        if (!validateUsername(username) || !validatePassword(password) || !validatePhone(phone)) {
          return {
            ok: false,
            error: "ERROR1104"
          }
        }
        const { phoneOk } = await jwt.verify(token, process.env.SECRET_KEY);

        if (phoneOk != phone) {
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
            phone,
            marketingAgree
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


        const memberIds = [a.id, 1]
        const b = await client.chatroom.create({
          data: {
            title: "",
            isPersonal: true,
            members: {
              connect: memberIds.map(memberId => ({
                id: memberId
              }))
            }
          },
        })
        for (var i = 0; i < memberIds.length; i++) {
          const c = await client.chatroomElement.create({
            data: {
              user: {
                connect: {
                  id: memberIds[i]
                }
              },
              chatroom: {
                connect: {
                  id: b.id
                }
              }
            }
          })
        }
        const d = await client.chatroom.update({
          where: {
            id: b.id
          },
          data: {
            title: "",
          },
          include: {
            members: true,
            lastMessage: true,
          }
        });

        const sendedMessage = await client.message.create({
          data: {
            text: "안녕하세요 가입자 여러분들.\nspecial place를 찾아 splace에 오신 것을 환영합니다.\n\n저희는 현재 2월 정식배포를 목적으로 시범운영 중인 서비스입니다.\n어제부로 갑자기 App store 메인에 첫 번째로 등장하여 지금 많은 가입자분들이 들어오고 계신 것으로 보입니다.\n저희도 최선을 다해 불편함을 끼쳐드리지 않고자 노력하고 있으나 여전히 부족함이 많은 서비스라는 것에는 이견이 없습니다.\n데이터도 부족하고 자잘한 버그들도 많을 텐데, 자비로운 마음으로 사용해주시면 정말 감사하겠습니다.\n\n이렇게 만나 다시 한번 반갑다는 말씀과 함께, 아직 부족한 서비스로 인해 죄송하다는 말씀드립니다.\n저희는 지속적인 업데이트로 더 나은 서비스 환경을 제공하기 위해 계속하여 노력하겠습니다.\n그럼 여러분의 하루에 행운이 가득하길 바라겠습니다.\n\n- 대표 dolphin 드림\n\n* 혹시 심각한 문제나 버그가 생긴다면 서비스 내 dolphin 계정으로 메시지 주시거나, support@lunen.co.kr로 메일 주시면 빠르게 답변드리겠습니다.\n* 이 계정은 splace 공식 계정으로 메시지 답신이 불가합니다.",
            authorId: 1,
            chatroomId: b.id
          }
        });
        const updatedChatroom = await client.chatroom.update({
          where: {
            id: b.id
          },
          data: {
            lastMessage: {
              connect: {
                id: sendedMessage.id
              }
            }
          },
        })

        const now = new Date();
        const duration = 5184000000;
        const newToken = await jwt.sign({ id: a.id, iat: now.getTime(), eat: now.getTime() + duration}, process.env.SECRET_KEY);


        return {
          ok: true,
          token: newToken,
          userId: a.id
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