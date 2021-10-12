import { gql } from "apollo-server";

export default gql`
  type seeProfileResult {
    ok: Boolean!
    error: String
    profile: User
  }
  type Query {
    seeProfile(userId: Int!): seeProfileResult!
  }
`;