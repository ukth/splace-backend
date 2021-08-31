import { gql } from "apollo-server";

export default gql`
  type giveMeMoneyResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    giveMeMoney(
      impUId: String!
      merchantUId: String!
      reason: String!
    ): giveMeMoneyResult!
  }
`;