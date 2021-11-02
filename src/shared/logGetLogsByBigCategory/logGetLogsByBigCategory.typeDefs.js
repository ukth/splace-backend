import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logGetLogsByBigCategory(tagId: Int!): defaultResult!
  }
`;