import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unblockUser(targetId: Int!): defaultResult!
  }
`;