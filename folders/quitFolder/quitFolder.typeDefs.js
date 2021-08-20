import { gql } from "apollo-server";

export default gql`
  type quitFolderResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    quitFolder(folderId: Int!): quitFolderResult!
  }
`;