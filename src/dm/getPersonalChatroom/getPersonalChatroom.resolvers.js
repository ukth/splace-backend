import { transformDocument } from "@prisma/client/runtime";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { CHATROOM_UPDATE } from "../../constants"
import pubsub from "../../pubsub";

export default {
  Mutation: {
    getPersonalChatroom: protectedResolver(async (_, { targetId }, { loggedInUser }) => {
      try {
        if(targetId == loggedInUser.id) {
          return {
            ok: false,
            error: "1M##"
          }
        }
        const room = await client.chatroom.findFirst({
          where: {
            AND: [
              {
                members: {
                  some: {
                    id: loggedInUser.id
                  }
                }
              },
              {
                members: {
                  some: {
                    id: targetId
                  }
                }
              }
            ],
            isPersonal: true
          },
          include: {
            members: true,
            messages: true,
            lastMessage: true,
            chatroomReaded: true
          }
        })
        if (!room) {
          const newChatroom = await client.chatroom.create({
            data: {
              title: "",
              isPersonal: true,
              members: {
                connect: [
                  {
                    id: loggedInUser.id
                  },
                  {
                    id: targetId
                  }
                ]
              }
            },
            include: {
              members: true,
              messages: true,
              lastMessage: true
            }
          })
          const memberIds = [loggedInUser.id, targetId]
          for (var i = 0; i < memberIds.length; i++) {
            const b = await client.chatroomReaded.create({
              data: {
                user: {
                  connect: {
                    id: memberIds[i]
                  }
                },
                chatroom: {
                  connect: {
                    id: newChatroom.id
                  }
                }
              }
            })
          }
          const updatedChat = await client.chatroom.update({
            where: {
              id: newChatroom.id
            },
            data: {
              title: "",
            },
            include: {
              members: true,
              lastMessage: true,
              chatroomReaded: true,
            }
          });
  
          pubsub.publish(CHATROOM_UPDATE, { chatroomUpdated: { ...updatedChat } })
          return {
            ok: true,
            chatroom: updatedChat
          }
        }
        return {
          ok: true,
          chatroom: updatedChat
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M14"
        }
      }
    }),
  },
};