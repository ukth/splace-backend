
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
                    userId: loggedInUser.id
                  }
                }
              },
              {
                members: {
                  some: {
                    userId: targetId
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
          }
        })
        if (!room) {
          const newChatroom = await client.chatroom.create({
            data: {
              title: "",
              isPersonal: true,
            }
          })
          const memberIds = [loggedInUser.id, targetId]
          
          for (var i = 0; i < memberIds.length; i++) {
            const b = await client.chatroomElement.create({
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
              members: {
                user: true
              },
              lastMessage: true,
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