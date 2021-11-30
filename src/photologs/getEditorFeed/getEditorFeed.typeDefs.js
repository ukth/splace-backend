import { gql } from "apollo-server";

export default gql`
  type getEditorFeedResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
    series: [Series]
  }
  type Query {
    getEditorFeed(lastLogId: Int, lastSeriesId: Int): getEditorFeedResult!
  }
`;