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
          }
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
            createdAt: {
              gte: weekAgo
            }
          }
        },
        include: {
          target: true,
          requestUser: true,
        }
      })
      const editFolderLogs = await client.editFolderLog.findMany({
        where: {
          target: {
            members: {
              some: {
                id: loggedInUser.id
              }
            }
          },
          createdAt: {
            gte: weekAgo
          }
        },
        include: {
          target: true,
          requestUser: true,
        }
      })

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