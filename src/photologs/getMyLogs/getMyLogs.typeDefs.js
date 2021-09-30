import { gql } from "apollo-server";

export default gql`
  type getMyLogsResult {
    ok: Boolean!
    error: String
    mine: [Photolog]
  }  
  type Query {
    getMyLogs(lastId: Int): getMyLogsResult!
  }
`;