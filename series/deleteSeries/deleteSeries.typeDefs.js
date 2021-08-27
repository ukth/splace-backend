import { gql } from "apollo-server";

export default gql`
  type deleteSeriesResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteSeries(
      seriesId: Int!
    ): deleteSeriesResult!
  }
`;