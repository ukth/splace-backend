import { gql } from "apollo-server";

export default gql`
  type searchByTagsResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    searchByTags(hashtagId: Int!, lastId: Int): searchByTagsResult!
  }
`;