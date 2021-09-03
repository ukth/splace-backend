import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addPhotologs(photologIds: [Int]!, seriesId: Int!): defaultResult!
  }
`;