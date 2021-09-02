import client from "../../client";
export default {
  Query: {
    seeProfile: async (_, { userId }) => {
      try {
        const profile = await client.user.findFirst({
          where: {
            userId,
          },
          include: {
            photologs: true,
          },
        })
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