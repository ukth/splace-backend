import client from "../../client";
export default {
  Query: {
    seeProfile: async (_, { userId }) => {
      try {
        const profile = await client.user.findFirst({
          where: {
            id: userId,
          },
          include: {
            photologs: true,
          },
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
        return {
          ok: false,
          error: "cant get profile"
        }
      }
    }
  }
}