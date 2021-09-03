import { gql } from "apollo-server";

export default gql`
  type Hashtag {
    hashtagId: Int!
    name:     String!
    photologs: [Photolog]
    splaces: [Splace]
  }
  type defaultResult {
    ok: Boolean!
    error: String
  }
`;