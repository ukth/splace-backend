import { gql } from "apollo-server";

export default gql`
  type Mutation {
    giveMeMoney(
      impUId: String!
      merchantUId: String!
      reason: String!
    ): defaultResult!
  }
`;