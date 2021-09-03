import { gql } from "apollo-server";

export default gql`
  type Mutation {
    followUser(targetId: Int!): defaultResult!
  }
`;