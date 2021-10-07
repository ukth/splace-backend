import { gql } from "apollo-server";

export default gql`
  type getMyScrapedLogResult{
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getMyScrapedLog: getMyScrapedLogResult
  }
`;