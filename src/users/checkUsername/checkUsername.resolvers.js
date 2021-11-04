import client from "../../client";
export default {
  Query: {
    checkUsername: async (_, { username }) => {
      try {
        const profile = await client.user.findFirst({
          where: {
            username,
          }
        })
        if(profile){
          return{
            ok: false,
            error: "ERROR3115"
          }
        }
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4116"
        }
      }
    }
  }
}