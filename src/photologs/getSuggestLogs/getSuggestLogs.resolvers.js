import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

function fisherYatesShuffle(arr){
  for(var i =arr.length-1 ; i>0 ;i--){
      var j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }
}

export default {
  Query: {
    getSuggestLogs: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        var logs = await client.photolog.findMany({
          where: {
            isPrivate: false,
            NOT: [
              {
                author: {
                  blockingUser: {
                    some: {
                      id: loggedInUser.id
                    }
                  }
                },
              },
              {
                hiddenUsers: {
                  some: {
                    id: loggedInUser.id
                  }
                }
              },
            ]
          },
          include: {
            categories: true,
            bigCategories: true,
            splace: true,
            author: true,
            seriesElements: {
              include: {
                sereis: true
              }
            },
            likedUser: true,
          },
          take: 200,
          orderBy: {
            likedUser: {
              _count: "desc"
            }
          },
        })
        if(logs.length === 0){
          return {
            ok: false,
            error: "ERROR2211"
          }
        }
        
        fisherYatesShuffle(logs)
        const recommended = logs.slice(0,logs.length > 32? 31: logs.length-1)
        return {
          ok: true,
          logs: recommended,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4213"
        };
      }
    })
  }
}