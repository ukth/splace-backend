import client from "../../client";
export default {
  Query: {
    seeProfile: async (_, { userId }) => {
      try {
        const profile = await client.user.findFirst({
          where: {
            id: userId,
          },
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            profileMessage: true,
            url: true,
          }
        })
        if(!profile){
          return{
            ok: false,
            error: "cant find profile"
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
          error: "cant get profile"
        }
      }
    }
  }
}