import { gql } from "apollo-server";

export default gql`
  type BlockedUser {
    id: Int!
    username: String!
    profileImageUrl: String
    name: String
  }
  type getMyBlockedUserResult{
    ok: Boolean!
    error: String
    users: [BlockedUser]
  }
  type Query {
    getMyBlockedUser: getMyBlockedUserResult
  }
`;