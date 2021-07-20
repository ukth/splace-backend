import client from "../../client";
export default {
  Query: {
    seeProfile: async (_, { userId }) => {
      const res = await client.user.findFirst({
        where: {
          user_id: userId,
        }
      });
      return {
        userId: res.user_id.toString(),
        firstName: res.first_name,
        lastName: res.last_name,
        userName: res.user_name,
        email: res.email,
        createdAt: res.created_at,
        updatedAt: res.updated_at,
        profileMessage: res.profile_message,
        profilePhoto: res.profile_photo
      };
    },
  },
};