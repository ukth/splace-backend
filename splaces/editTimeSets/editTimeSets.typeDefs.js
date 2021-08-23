import { gql } from "apollo-server";

export default gql`
  type editTimeSetsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editTimeSets(
      timeSetId: Int!
      open: String!
      close: String!
    ): editTimeSetsResult!
  }
`;