import { gql } from "apollo-server";

export default gql`
  type getLogsByBigCategoryResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getLogsByBigCategory(tagId: Int!, lastId: Int): getLogsByBigCategoryResult!
  }
`;