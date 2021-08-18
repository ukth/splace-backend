import { gql } from "apollo-server";

export default gql`
  type unlikeCommentsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unlikeComments(
      commentId: Int!
    ): unlikeCommentsResult!
  }
`;