import { gql } from "apollo-server";

export default gql`
  type User {
    userId: Int!
    firstname: String!
    lastname: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    profileMessage: String
    profilePhoto: String
  }

  type Followings {
    followingId: Int!
    userId: Int!
    targetId: Int!
    createdAt: String!
  }
`;