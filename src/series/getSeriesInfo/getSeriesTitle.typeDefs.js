import { gql } from "apollo-server";

export default gql`
  type seeSeriesResult {
    ok: Boolean!
    error: String
    series: Series
  }
  type Query {
    seeSeries(seriesId: Int!): seeSeriesResult!
  }
`;