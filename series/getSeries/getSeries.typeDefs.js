import { gql } from "apollo-server";

export default gql`
  type getSeriesResult {
    ok: Boolean!
    error: String
    series: [Series]
  }
  type Query {
    getSeries(lastId: Int): getSeriesResult!
  }
`;