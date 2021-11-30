import { gql } from "apollo-server";

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
    token: String
    userId: Int
  }
  type Mutation {
    createAccount(
      username: String!
      password: String!
      phone: String!
      token: String!
      marketingAgree: Boolean!
    ): createAccountResult!
  }
`;