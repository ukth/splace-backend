import { gql } from "apollo-server";

export default gql`
  type seeFolderResult {
    ok: Boolean!
    error: String
    saves: [Save]
  }
  type Query {
    seeFolder(folderId: Int, lastId: Int): seeFolderResult!
  }
`;