import { gql } from "apollo-server";

export default gql`
  type follower {
    userId: Int!
    userName: String!
    profilePhoto: String
  }
  type SeeFollwersResult {
    ok: Boolean!
    error: String
    followers: [follower]
  }
  type Query {
    seeFollowers(userId: Int!): SeeFollwersResult!
  }
`;