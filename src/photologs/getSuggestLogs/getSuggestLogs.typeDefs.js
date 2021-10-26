import { gql } from "apollo-server";

export default gql`
  type getSuggestLogsResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getSuggestLogs: getSuggestLogsResult!
  }
`;