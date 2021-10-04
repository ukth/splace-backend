import { gql } from "apollo-server";

export default gql`
  type getSavesResult {
    ok: Boolean!
    error: String
    saves: [Save]
  }
  type Query {
    getMySaves: getSavesResult!
  }
`;