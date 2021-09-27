import { gql } from "apollo-server";

export default gql`
  type Mutation {
    blockUser(targetId: Int!): defaultResult!
  }
`;