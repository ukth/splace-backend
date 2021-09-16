import { gql } from "apollo-server";

export default gql`
  type newFollowerResult {
    followed: User
    following: User
  }
  type Subscription {
    newFollower: newFollowerResult
  }
`;