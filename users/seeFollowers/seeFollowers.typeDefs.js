import { gql } from "apollo-server";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
  }
  type Query {
    seeFollowers(userId: Int!): SeeFollowersResult!
  }
`;