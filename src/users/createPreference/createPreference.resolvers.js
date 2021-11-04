import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    createPreference: protectedResolver ( async (
      _,
      { preference },
      { loggedInUser }
    ) => {
      try {
        if(preference.length != 5){
          return {
            ok: false,
            error: "ERROR1###"
          }
        }
        const p = await client.user.update({
          where: {
            id: loggedInUser.id
          },
          data: {
            preference
          }
        })
        return {
          ok: true,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "ERROR4107",
        };
      }
    })
  }
};