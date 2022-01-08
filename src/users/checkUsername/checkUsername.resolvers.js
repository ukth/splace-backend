import client from "../../client";
import { validateUsername } from "../../re";

export default {
  Query: {
    checkUsername: async (_, { username }) => {
      try {
        const invalidUsername = ["dreamost_heo","lunen","supersuper","splace","strongstring315","nova",]
        if (!validateUsername(username) || invalidUsername.includes(username.toLowerCase())) {
          return {
            ok: false,
            error: "ERROR1104"
          }
        }
        const profile = await client.user.findFirst({
          where: {
            username: username.toLowerCase(),
            activate: true
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