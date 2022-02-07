import { gql } from "apollo-server";

export default gql`
  type getMyBlockedUserResult{
    ok: Boolean!
    error: String
    users: [User]
  }
  type Query {
    getMyBlockingUser: getMyBlockedUserResult
  }
`;