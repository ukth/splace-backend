import { gql } from "apollo-server";

export default gql`

  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    followers: [User]
  }
  type Query {
    seeFollowings(userId: Int!): SeeFollowingsResult!
  }
`;