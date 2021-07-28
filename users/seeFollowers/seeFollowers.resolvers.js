import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        seeFollowers: protectedResolver(async (_, { userId }, { loggedInUser }) => {
            const followers = await client.user.findUnique({
                where: {
                    userId
                }
            }).followers();

            if(!followers){
                return {
                    ok: false,
                    error: "not found"
                }
            }

            // console.log( );
            return {
                ok: true,
                followers
            };
        }),
    },
};