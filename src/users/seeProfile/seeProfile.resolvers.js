import client from "../../client";
export default {
  Query: {
    seeProfile: async (_, { userId }) => {
      try {
        const profile = await client.user.findFirst({
          where: {
            id: userId,
            activate: true,
          },
          select: {
            id: true,
            name: true,
            username: true,
            profileImageUrl: true,
            profileMessage: true,
            url: true,
            createdAt: true,
            updatedAt: true,
            authority: true,
          }
        })
        if(!profile){
          return{
            ok: false,
            error: "ERROR2115"
          }
        }
        return {
          ok: true,
          profile: profile
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4116"
        }
      }
    }
  }
}