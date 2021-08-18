import { gql } from "apollo-server";

export default gql`
  type editCommentsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editComments(
      commentId: Int!
      text: String!
    ): editCommentsResult!
  }
`;