import { gql } from "apollo-server";

export default gql`
  type getUserSeriesResult {
    ok: Boolean!
    error: String
    series: [Series]
  }
  type Query {
    getUserSeries(userId: Int!, lastId: Int): getUserSeriesResult!
  }
`;