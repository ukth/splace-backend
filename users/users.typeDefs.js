import { gql } from "apollo-server";

export default gql`
  type User {
    userId: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    profileMessage: String
    profilePhoto: String
  }

  type Followings {
    followingId: Int!
    userId: Int!
    target_id: Int!
    createdAt: String!
  }
`;