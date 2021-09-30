import { gql } from "apollo-server";

export default gql`
  type getFeedResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
    series: [Series]
  }
  type Query {
    getFeed(lastLogId: Int, lastSeriesId: Int): getFeedResult!
  }
`;