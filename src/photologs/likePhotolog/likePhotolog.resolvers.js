import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import dataset from "../../bigquery";


export default {
  Mutation: {
    likePhotolog: protectedResolver(async (
      _,
      { photologId },
      { loggedInUser }
    ) => {
      try {
        const b = await client.photolog.findUnique({
          where: {
            id: photologId
          },
        })
        if(b.isPrivate && b.authorId != loggedInUser.id){
          return {
            ok: false,
            error: "ERROR1212"
          }
        }
        const ok = await client.likeLog.findFirst({
          where: {
            targetId: photologId,
            requestUserId: loggedInUser.id
          }
        })
        if(ok){
          return {
            ok: false,
            error: "already liked"
          }
        }
        const log = await client.likeLog.create({
          data: {
            target: {
              connect: {
                id: photologId
              }
            },
            requestUser: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        })

        const time = new Date().toISOString().slice(0, 23)
        const table = dataset.table('likeLog')
        const rows = [
          {
            targetId: log.targetId,
            requestUserId: log.requestUserId,
            createdAt: time 
          }
        ]
        const log = await table.insert(rows)

        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4217",
        };
      }
    }),
  }
};
