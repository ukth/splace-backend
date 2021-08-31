import { gql } from "apollo-server";

export default gql`
  type giveMeCreditsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    giveMeCredits(
      impUId: String!
      merchantUId: String!
      amount: Int!
      credit: Int!
    ): giveMeCreditsResult!
  }
`;