import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editPasswordWithLogin(
      newPassword: String!
      password: String!
    ): defaultResult!
  }
`;