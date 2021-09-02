import client from "../../client";
import { protectedResolver } from "../../users/users.utils";


export default {
  Query: {
    getPaymentLogs: protectedResolver(async (_, { lastId }, { loggedInUser }) => {
      try {
        const logs = await client.paymentLog.findMany({
          where: {
            customerId: loggedInUser.userId
          },
          take: 5,
          ...(lastId && { cursor: { paymentLogId: lastId } }),
          skip: lastId ? 1 : 0,
          orderBy: {
            createdAt: "desc",
          },
        })
        return {
          ok: true,
          logs: logs,
        };
      } catch (e) {
        return {
          ok: false,
          error: "cant get paymentLogs"
        };
      }
    })
  }
}