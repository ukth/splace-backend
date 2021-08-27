import { gql } from "apollo-server";

export default gql`
  type removePhotologsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    removePhotologs(photologIds: [Int]!, seriesId: Int!): removePhotologsResult!
  }
`;