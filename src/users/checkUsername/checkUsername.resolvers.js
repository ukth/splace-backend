import client from "../../client";

function validateUsername(text) {
  if (text.length < 1 || text.length > 30) return false
  const exp = /^[0-9a-z._]*$/;
  return exp.test(String(text));
};
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