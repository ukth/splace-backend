import { gql } from "apollo-server";

export default gql`
  type getSplacesByRatingtagResult {
    ok: Boolean!
    error: String
    splaces: [Splace]
  }
  type Query {
    getSplacesByRatingtag(tagId: Int!, lastId: Int): getSplacesByRatingtagResult!
  }
`;