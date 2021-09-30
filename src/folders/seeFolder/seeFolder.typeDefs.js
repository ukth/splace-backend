import { gql } from "apollo-server";

export default gql`
  type seeFolderResult {
    ok: Boolean!
    error: String
    folder: Folder
  }
  type Query {
    seeFolder(folderId: Int!): seeFolderResult!
  }
`;