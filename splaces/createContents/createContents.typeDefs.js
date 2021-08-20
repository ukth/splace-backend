import { gql } from "apollo-server";

export default gql`
  type createContentsResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createContents (
      title: String!
      splaceId: Int!
    ): createContentsResult!
  }
`;