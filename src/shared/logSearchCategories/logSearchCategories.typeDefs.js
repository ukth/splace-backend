import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logSearchCategories(keyword: String!): defaultResult!
  }
`;