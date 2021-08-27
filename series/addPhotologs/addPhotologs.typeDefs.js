import { gql } from "apollo-server";

export default gql`
  type addPhotologsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addPhotologs(photologIds: [Int]!, seriesId: Int!): addPhotologsResult!
  }
`;