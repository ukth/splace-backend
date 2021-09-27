import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteSeries(
      seriesId: Int!
    ): defaultResult!
  }
`;