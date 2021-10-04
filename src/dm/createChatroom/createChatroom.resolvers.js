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
        //memberIds.push(loggedInUser.userId);
        if (!memberIds.includes(loggedInUser.id)) {
          return {
            ok: false,
            error: "to create chatroom, you have to include yourself"
          }
        }

        if (isPersonal) {
          if (memberIds.length !== 2) {
            return {
              ok: false,
              error: "to make personal chatroom, member should be 2"
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
          if(ok){
            return {
              ok: false,
              error: "personal chatroom already exist"
            }
          }
        }

          const myfollowers = loggedInUser.followers.map(follower => follower.id)
          //console.log(myfollowings);
          for (var i = 0; i < memberIds.length; i++) {
            if (!myfollowers.includes(memberIds[i]) && memberIds[i] !== loggedInUser.id) {
              return {
                ok: false,
                error: "invalid member included"
              }
            }
          }

          const a = await client.chatroom.create({
            data: {
              title,
              members: {
                connect: memberIds.map(memberId => ({
                  id: memberId
                }))
              }
            },
          });

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
                    id: a.id
                  }
                }
              }
            })
          }

          const c = await client.chatroom.update({
            where: {
              id: a.id
            },
            data: {
              title,
            },
            include: {
              members: true,
              lastMessage: true,
            }
          });

          pubsub.publish(CHATROOM_UPDATE, { chatroomUpdated: { ...c } })

          //console.log(a);
          return {
            ok: true,
            chatroom: c
          };
        } catch (e) {
          console.log(e);
          return {
            ok: false,
            error: "cant create chatroom",
          };
        }
      }),
  }
};
