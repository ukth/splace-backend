import { gql } from "apollo-server";

export default gql`
  type Mutation {
    showPhotologs(targetId: Int!): defaultResult
  }
`;