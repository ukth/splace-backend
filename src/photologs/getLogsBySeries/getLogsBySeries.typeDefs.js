import { gql } from "apollo-server";

export default gql`
  type getLogsBySeriesResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
  }
  type Query {
    getLogsBySeries(seriesId: Int!, lastId: Int): getLogsBySeriesResult!
  }
`;