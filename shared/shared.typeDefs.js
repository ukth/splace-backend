import { gql } from "apollo-server";

export default gql`
  type Hashtag {
    id: Int!
    name:     String!
    photologs: [Photolog]
    splaces: [Splace]
  }
  type defaultResult {
    ok: Boolean!
    error: String
  }
`;