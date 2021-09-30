import { gql } from "apollo-server";

export default gql`
  type Mutation {
    removePhotologs(photologIds: [Int]!, seriesId: Int!): defaultResult!
  }
`;