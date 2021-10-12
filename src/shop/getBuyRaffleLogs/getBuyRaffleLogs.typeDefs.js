import { gql } from "apollo-server";

export default gql`
  type getBuyRaffleLogsResult {
    ok: Boolean!
    error: String
    logs: [BuyRaffleLog]
  }
  type Query {
    getBuyRaffleLogs(lastId: Int): getBuyRaffleLogsResult!
  }
`;