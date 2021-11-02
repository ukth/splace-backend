import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSeries(title: String!, photologIds: [Int]!, seriesId: Int!): defaultResult!
  }
`;