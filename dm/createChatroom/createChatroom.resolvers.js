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
        if(!memberIds.includes(loggedInUser.userId)){
          return{
            ok: false,
            error: "to create chatroom, you have to include yourself"
          }
        }
        const a = await client.chatroom.create({
          data: {
            title,
            members: {
              connect: memberIds.map(memberId => ({
                userId: memberId
              }))
            }
          },
        });
        //console.log(a);
        return {
          ok: true,
        };
      } catch (e) {
        //console.log(e);
        return {
          ok: false,
          error: "cant create chatroom",
        };
      }
    }),
  }
};
