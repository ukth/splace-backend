import { gql } from "apollo-server";

export default gql`
  type getSeriesResult {
    ok: Boolean!
    error: String
    logs: [Photolog]
    series: [Series]
  }
  type Query {
    getSeries(lastId: Int): getSeriesResult!
  }
`;