import { gql } from "apollo-server";

export default gql`
  type getLogsByCategoryResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getLogsByCategory(tagId: Int!, lastId: Int): getLogsByCategoryResult!
  }
`;