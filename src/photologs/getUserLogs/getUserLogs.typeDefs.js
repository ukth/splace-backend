import { gql } from "apollo-server";

export default gql`
  type getUserLogsResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }  
  type Query {
    getUserLogs(userId: Int!, lastId: Int): getUserLogsResult!
  }
`;