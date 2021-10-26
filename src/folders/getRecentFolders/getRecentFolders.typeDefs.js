import { gql } from "apollo-server";

export default gql`
  type getRecentFoldersResult {
    ok: Boolean!
    error: String
    folders: [Folder]
  }
  type Query {
    getRecentFolders: getRecentFoldersResult!
  }
`;