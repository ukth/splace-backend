import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        seeFollowings: protectedResolver(async (_, { userId }, { loggedInUser }) => {
            const followings = await client.user.findUnique({
                where: {
                    userId
                }
            }).followings();

            if(!followings){
                return {
                    ok: false,
                    error: "not found"
                }
            }

            // console.log( );
            return {
                ok: true,
                followings
            };
        }),
    },
};