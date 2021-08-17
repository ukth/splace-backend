import { gql } from "apollo-server";

export default gql`
  type createFolderResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createFolder(
      title: String!
    ): createFolderResult!
  }
`;