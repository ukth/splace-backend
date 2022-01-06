import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { CHATROOM_UPDATE } from "../../constants"
import pubsub from "../../pubsub";

export default {
  Mutation: {
    createChatroom: protectedResolver(async (
      _,
      { title, memberIds, isPersonal },
      { loggedInUser }
    ) => {
      try {
        if (!memberIds.includes(loggedInUser.id)) {
          return {
            ok: false,
            error: "ERROR1M14"
          }
        }
        if (memberIds.includes(1)) {
          return {
            ok: false,
            error: "ERROR1###"
          }
        }
        if (isPersonal) {
          return {
            ok: false,
            error: "ERROR1###"
          }
        }
        if (title.length < 1 && title.length > 20) {
          return {
            ok: false,
            error: "ERROR1M17"
          }
        }
        if (!isPersonal && memberIds.length <= 2) {
          return {
            ok: false,
            error: "ERROR1M16"
          }
        }
        
        
        if (isPersonal) {
          if (memberIds.length !== 2) {
            return {
              ok: false,
              error: "ERROR1M15"
            }
          }
          const ok = await client.chatroom.findFirst({
            where: {
              AND: [
                {
                  members: {
                    some: {
                      id: memberIds[0]
                    }
                  }
                },
                {
                  members: {
                    some: {
                      id: memberIds[1]
                    }
                  }
                }
              ]
            }
          })
          if (ok) {
            return {
              ok: false,
              error: "ERROR3M11"
            }
          }
        }

        const myfollowers = loggedInUser.followers.map(follower => follower.id)

        for (var i = 0; i < memberIds.length; i++) {
          if (!myfollowers.includes(memberIds[i]) && memberIds[i] !== loggedInUser.id) {
            return {
              ok: false,
              error: "ERROR1M12"
            }
          }
        }

        const newChat = await client.chatroom.create({
          data: {
            title,
            isPersonal,
            members: {
              connect: memberIds.map(memberId => ({
                id: memberId
              }))
            }
          },
        });

        for (var i = 0; i < memberIds.length; i++) {
          const chatReaded = await client.chatroomReaded.create({
            data: {
              user: {
                connect: {
                  id: memberIds[i]
                }
              },
              chatroom: {
                connect: {
                  id: newChat.id
                }
              }
            }
          })
        }

        const chatroom = await client.chatroom.update({
          where: {
            id: newChat.id
          },
          data: {
            title,
          },
          include: {
            members: true,
            lastMessage: true,
            chatroomReaded: true,
          }
        });

        pubsub.publish(CHATROOM_UPDATE, { chatroomUpdated: { ...chatroom } })


        return {
          ok: true,
          chatroom
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4M12",
        };
      }
    }),
  }
};
