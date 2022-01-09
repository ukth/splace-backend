import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    getMyActivityLogs: protectedResolver(async (_, {}, { loggedInUser }) => {
      try{

      const now = new Date();
      const duration = 604800000;
      const weekAgo = new Date(now.getTime() - duration)
      const followLogs = await client.followLog.findMany({
        where: {
          targetId: loggedInUser.id,
          createdAt: {
            gte: weekAgo
          },
          NOT: [
            {
              requestUserId: loggedInUser.id
            }
          ]
        },
        include: {
          target: true,
          requestUser: true,
        }
      })
      const likeLogs = await client.likeLog.findMany({
        where: {
          target: {
            authorId: loggedInUser.id,
          },
          createdAt: {
            gte: weekAgo
          },
          NOT: [
            {
              requestUserId: loggedInUser.id
            }
          ]
        },
        include: {
          target: true,
          requestUser: true,
        }
      })
      const recentSaves = await client.save.findMany({
        where: {
          folder: {
            members: {
              some: {
                id: loggedInUser.id
              }
            }
          },
          createdAt: {
            gte: weekAgo
          },
          NOT: [
            {
              savedUserId: loggedInUser.id
            }
          ]
        },
        include: {
          folder: true,
          savedUser: true
        }
      })
      const editFolderLogs = recentSaves.map( save => ({
        id: save.id,
        target: save.folder,
        requestUser: save.savedUser,
        createdAt: save.createdAt
      }))

      return {
        ok: true,
        followLogs,
        editFolderLogs,
        likeLogs
      }
    } catch (e){
      console.log(e)
      return {
        ok: false,
        error: "ERROR4121"
      }
    }
    })
  }
}