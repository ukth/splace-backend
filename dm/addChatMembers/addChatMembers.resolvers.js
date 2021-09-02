import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    addChatMembers: protectedResolver(async (_, { memberIds, chatroomId }, { loggedInUser }) => {
      try {
        const ok = await client.chatroom.findUnique({ where: { chatroomId } })
          .members({
            where: { userId: loggedInUser.userId }
          });
        console.log(ok);
        if (ok.length == 0) {
          return {
            ok: false,
            error: "you dont have authentication to edit member."
          };
        }
        await client.chatroom.update({
          where: {
            chatroomId
          },
          data: {
            members: {
              connect: memberIds.map(memberId => ({
                userId: memberId
              }))
            }
          }
        });
        // console.log(client);
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "cant add member",
        };
      }
    }),
  },
};