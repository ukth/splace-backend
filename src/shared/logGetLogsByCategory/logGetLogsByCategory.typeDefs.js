import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logGetLogsByCategory(tagId: Int!): defaultResult!
  }
`;