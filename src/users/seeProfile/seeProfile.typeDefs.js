import { gql } from "apollo-server";

export default gql`
  type Profile {
    id: Int!
    username: String!
    profileImageUrl: String
    profileMessage: String
    url: String
  }
  type seeProfileResult {
    ok: Boolean!
    error: String
    profile: Profile
  }
  type Query {
    seeProfile(userId: Int!): seeProfileResult!
  }
`;