import { gql } from "apollo-server";

export default gql`
  type likePhotologResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    likePhotolog(
      photologId: Int!
    ): likePhotologResult!
  }
`;