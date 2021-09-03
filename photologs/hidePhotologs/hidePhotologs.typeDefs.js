import { gql } from "apollo-server";

export default gql`
  type Mutation {
    hidePhotologs(targetId: Int!): defaultResult!
  }
`;