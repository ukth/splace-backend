import client from "../../client";
export default {
  Query: {
    seeProfile: (_, { userId }) => client.user.findFirst({
      where: {
        userId,
      },
      include: {
        followers: true,
        followings: true,
        likedPhotologs: true,
      },
    })
  }
}