import { gql } from "apollo-server";

export default gql`
  type getFeedResult {
    ok: Boolean!
    error: String
    feed: [Photolog]
  }
  type Query {
    getFeed(lastId: Int): getFeedResult!
  }
`;