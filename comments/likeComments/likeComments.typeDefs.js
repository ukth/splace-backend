import { gql } from "apollo-server";

export default gql`
  type likeCommentsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    likeComments(
      commentId: Int!
    ): likeCommentsResult!
  }
`;