import { gql } from "apollo-server";

export default gql`
  type unlikePhotologResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unlikePhotolog(
      photologId: Int!
    ): unlikePhotologResult!
  }
`;