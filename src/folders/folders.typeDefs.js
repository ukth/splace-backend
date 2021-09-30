import { gql } from "apollo-server";

export default gql`
  type Save {
    id: Int!
    createdAt: String!
    splace: Splace!
    folder: Folder!
  }

  type Folder {
    id: Int!
    title: String!
    createdAt: String!
    updatedAt: String!
    members: [User]
    saves: [Save]
  }
`;