import { gql } from "apollo-server";

export default gql`
  type getMySeriesResult {
    ok: Boolean!
    error: String
    series: [Series]
  }
  type Query {
    getMySeries(lastId: Int): getMySeriesResult!
  }
`;