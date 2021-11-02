import { gql } from "apollo-server";

export default gql`
  type getLogsByBigCategoryResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Mutation {
    getLogsByBigCategory(tagId: Int!, lastId: Int): getLogsByBigCategoryResult!
  }
`;