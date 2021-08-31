import { gql } from "apollo-server";

export default gql`
  type Save {
    saveId: Int!
    createdAt: String!
    splace: Splace!
    folder: Folder!
  }

  type Folder {
    folderId: Int!
    title: String!
    createdAt: String!
    updatedAt: String!
    members: [User]
    saves: [Save]
  }
`;