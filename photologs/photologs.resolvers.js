import client from "../client";

export default {
  Photolog: {
    totalLiked: ({ photologId }) =>
      client.user.count({
        where: {
          likedPhotologs: {
            some: {
              photologId,
            },
          },
        },
      }),
  },
};