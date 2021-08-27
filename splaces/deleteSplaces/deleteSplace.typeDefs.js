import { gql } from "apollo-server";

export default gql`
  type deleteSplaceResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteSplace(
      splaceId: Int!
    ): deleteSplaceResult!
  }
`;