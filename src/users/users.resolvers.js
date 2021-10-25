import client from "../client";

export default {
  User: {
    totalFollowing: async ({ id }) => {
      try {
        const num = await client.user.count({
          where: {
            followers: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    totalFollowers: async ({ id }) => {
      try {
        const num = await client.user.count({
          where: {
            followings: {
              some: {
                id
              },
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      try {
        if (!loggedInUser) {
          return false;
        }
        const exists = await client.user.count({
          where: {
            id: loggedInUser.id,
            followings: {
              some: {
                id,
              },
            },
          },
        });
        return Boolean(exists);
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    totalLogsNumber: async ({ id }) => {
      try {
        const num = await client.photolog.count({
          where: {
            author: {
              id
            },
          },
        })
        return num;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    unreadChatExist: async ({ id }) => {
      try {
          const chatread = await client.chatroomReaded.findMany({
            where: {
              userId: id
            },
            include: {
              chatroom: true,
            },
            take: 50,
          })
          const unread = chatread.filter(chatread => 
            chatread.updatedAt < chatread.chatroom.updatedAt
          )
          return unread.length!=0
      } catch(e) {
        console.log(e)
        return null;
      }
    },
    unreadNoticeExist: async ({ id, noticeReaded}) => {
      try {
          const notice = await client.notice.findFirst({
            where: {
              userId: id
            },
            include: {
              chatroom: true,
            },
            take: 1,
            orderBy: {
              updatedAt: "desc"
            }
          })
          if(!notice) return false
          return notice.createdAt > noticeReaded
      } catch(e) {
        console.log(e)
        return null;
      }
    }
  },
};