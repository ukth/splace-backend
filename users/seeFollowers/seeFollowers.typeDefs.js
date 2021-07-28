import { gql } from "apollo-server";

export default gql`
  type SeeFollwersResult {
    ok: Boolean!
    error: String
    followers: [User]
  }
  type Query {
    seeFollowers(userId: Int!): SeeFollwersResult!
  }
`;