import { gql } from "apollo-server";

export default gql`
  type createSplacesResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createSplaces(
      name: String!
    ): uploadLogResult!
  }
`;