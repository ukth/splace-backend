import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logGetLogsBySplace(splaceId: Int!): defaultResult!
  }
`;