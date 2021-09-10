import { hash } from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getTags: protectedResolver(async (_, { keyword, lastSpecialId, lastHashId }, { loggedInUser }) => {
      try {
        const specialtags = await client.specialtag.findMany({
          where: {
            name: {
              startsWith: keyword
            }
          },
          select: {
            id: true,
            name: true,
            color: true
          },
          take: 2,
          ...(lastId && { cursor: { id: lastSpecialId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            title: "asc",
          },
        })
        const hashtags = await client.hashtag.findMany({
          where: {
            name: {
              startsWith: keyword
            }
          },
          select: {
            id: true,
            name: true
          },
          take: 2,
          ...(lastId && { cursor: { id: lastHashId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            title: "asc",
          },
        })
        return {
          ok: true,
          specialtags,
          hashtags
        };
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "can't get tags"
        };
      }
    })
  }
}