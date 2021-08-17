import { gql } from "apollo-server";

export default gql`
  type Save {
    saveId: Int!
    createdAt: String!
    splace: Splace!
    folder: Folder!
  }

  type Scrap {
    scrapId: Int!
    createdAt: String!
    photolog: Splace!
    folder: Folder!
  }

  type Folder {
    folderId: Int!
    title: String!
    createdAt: String!
    members: [User]
    saves: [Save]
    scraps: [Scrap]
  }
`;