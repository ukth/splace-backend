import { gql } from "apollo-server";

export default gql`
  type createSeriesResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createSeries(
      title: String!
    ): createSeriesResult!
  }
`;