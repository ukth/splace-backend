import { gql } from "apollo-server";

export default gql`
  type getLogsBySeriesResult {
    ok: Boolean!
    error: String
    seriesElements: [SeriesElement]
  }
  type Mutation {
    getLogsBySeries(seriesId: Int!, lastId: Int): getLogsBySeriesResult!
  }
`;