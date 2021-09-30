import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createChatroom: protectedResolver(async (
      _,
      { title, memberIds },
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

        for(var i = 0; i < memberIds.length; i++) {
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
        });

        //console.log(a);
        return {
          ok: true,
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
