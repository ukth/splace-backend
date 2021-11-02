import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSeriesTitle(
      seriesId: Int!
      title: String!
    ): defaultResult!
  }
`;