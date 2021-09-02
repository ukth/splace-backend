import { gql } from "apollo-server";

export default gql`
  type getLogsInSeriesResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getLogsInSeries(seriesId: Int!, lastId: Int): getLogsInSeriesResult!
  }
`;