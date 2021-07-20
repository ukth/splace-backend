import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        seeFollowers: protectedResolver(async (_, { userId }, { loggedInUser }) => {
        const followers = await client.followings.findMany({ where: { target_id: userId } });
        await client.followings.create({
            data: {
                user_id: loggedInUser.user_id,
                target_id: target.user_id
            },
        });
        return {
            ok: true,
        };
        }),
    },
};