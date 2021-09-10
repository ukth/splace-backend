import { gql } from "apollo-server";

export default gql`
  type searchByTagsResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    searchByTags(tagId: Int!, lastId: Int): searchByTagsResult!
  }
`;