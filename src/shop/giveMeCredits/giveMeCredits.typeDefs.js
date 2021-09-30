import { gql } from "apollo-server";

export default gql`
  type Mutation {
    giveMeCredits(
      impUId: String!
      merchantUId: String!
      amount: Int!
      credit: Int!
    ): defaultResult!
  }
`;