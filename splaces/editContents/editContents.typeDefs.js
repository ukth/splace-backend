import { gql } from "apollo-server";

export default gql`
  type editContentsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editContents (
      title: String
      imageUrl: String
      text: String
      splaceId: Int!
      fixedContentId: Int!
    ): editContentsResult!
  }
`;