import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createTimeSets(
      open: String!
      close: String!
      day: Int!
      splaceId: Int!
    ): defaultResult!
  }
`;