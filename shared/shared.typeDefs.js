import { gql } from "apollo-server";

export default gql`
  type Hashtag {
    id: Int!
    name:     String!
    photologs: [Photolog]
    splaces: [Splace]
    totalSplace: Int
    totalPhotologs: Int
  }
  type Specialtag {
    id: Int!
    name:     String!
    color: String!
    photologs: [Photolog]
    splaces: [Splace]
    totalSplace: Int
    totalPhotologs: Int
  }
  type defaultResult {
    ok: Boolean!
    error: String
  }
`;