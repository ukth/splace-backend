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
  type Specialtag {
    id: Int!
    name:     String!
    color: String!
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
`;