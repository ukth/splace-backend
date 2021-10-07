import { gql } from "apollo-server";

export default gql`
  type getMyScrapedSeriesResult{
    ok: Boolean!
    error: String
    series: [Series]
  }
  type Query {
    getMyScrapedSeries: getMyScrapedSeriesResult
  }
`;