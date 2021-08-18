import { gql } from "apollo-server";

export default gql`
  type writeCommentsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    writeComments(
      text: String!
      photologId: Int!
    ): writeCommentsResult!
  }
`;