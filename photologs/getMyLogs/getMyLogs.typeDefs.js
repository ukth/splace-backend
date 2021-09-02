import { gql } from "apollo-server";

export default gql`
  type Query {
    type getMyLogsResult {
      ok: Boolean!
      error: String
      mine: [Photolog]
    }
    getMyLogs(lastId: Int): getMyLogsResult!
  }
`;