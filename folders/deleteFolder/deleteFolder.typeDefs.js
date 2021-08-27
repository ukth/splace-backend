import { gql } from "apollo-server";

export default gql`
  type deleteFolderResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteFolder(
      folderId: Int!
    ): deleteFolderResult!
  }
`;