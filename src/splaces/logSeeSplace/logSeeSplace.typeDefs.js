import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logSeeSplace(splaceId: Int!): defaultResult!
  }
`;