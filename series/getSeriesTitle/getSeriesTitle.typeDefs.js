import { gql } from "apollo-server";

export default gql`
  type getSeriesTitleResult {
    ok: Boolean!
    error: String
    series: [Series]
  }
  type Query {
    getSeriesTitle(keyword: String, lastId: Int): getSeriesTitleResult!
  }
`;