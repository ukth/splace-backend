import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editPassword(
      token: String!
      password: String!
    ): defaultResult!
  }
`;