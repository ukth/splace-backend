import client from "../../client";
import { protectedResolver } from "../users.utils";


export default {
  Query: {
    getMe: protectedResolver(async (_, {}, { loggedInUser }) => {
      console.log(loggedInUser);
      return loggedInUser;
    })
  }
}