import { gql } from "apollo-server";

export default gql`
  type buyItemResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    buyItem(
      itemId: Int!
    ): buyItemResult!
  }
`;