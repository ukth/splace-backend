import { gql } from "apollo-server";

export default gql`
  type getMySplaceResult{
    ok: Boolean!
    error: String
    splaces: [Splace]
  }
  type Query {
    getMySplace: getMySplaceResult
  }
`;