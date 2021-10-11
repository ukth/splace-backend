import { gql } from "apollo-server";

export default gql`
  type Mutation {
    buyRaffle(
      raffleId: Int!
    ): defaultResult!
  }
`;