import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logSeeSeries(seriesId: Int!): defaultResult!
  }
`;