import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editTimeSets(
      timeSetId: Int!
      open: String!
      close: String!
    ): defaultResult!
  }
`;