import { gql } from "apollo-server";

export default gql`
  type Category {
    id: Int!
    name:     String!
    photologs: [Photolog]
    splaces: [Splace]
    totalSplace: Int
    totalPhotologs: Int
    createdAt: String!
    updatedAt: String!
  }
  type BigCategory {
    id: Int!
    name:     String!
    photologs: [Photolog]
    splaces: [Splace]
    totalSplace: Int
    totalPhotologs: Int
    createdAt: String!
    updatedAt: String!
  }
  type defaultResult {
    ok: Boolean!
    error: String
  }
  type LikeLog {
    id: Int!
    target: Photolog!
    requestUser: User!
    createdAt: String!
  }
  type FollowLog {
    id: Int!
    target: User!
    requestUser: User!
    createdAt: String!
  }
`;