import { gql } from "apollo-server";

export default gql`
  type createTimeSetsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createTimeSets(
      open: String!
      close: String!
      day: Int!
      splaceId: Int!
    ): uploadLogResult!
  }
`;