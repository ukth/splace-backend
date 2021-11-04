import { gql } from "apollo-server";

export default gql`
  type getUsernameResult {
    ok: Boolean!
    error: String
    username: String
  }
  type Query {
    getUsername(
      token: String!
    ): getUsernameResult!
  }
`;