import { gql } from "apollo-server";

export default gql`
  type deletePhotologResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePhotolog(
      photologId: Int!
    ): deletePhotologResult!
  }
`;