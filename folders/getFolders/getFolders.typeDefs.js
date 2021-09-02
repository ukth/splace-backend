import { gql } from "apollo-server";

export default gql`
  type getFoldersResult {
    ok: Boolean!
    error: String
    folders: [Folder]
  }
  type Query {
    getFolders(lastId: Int): getFoldersResult!
  }
`;