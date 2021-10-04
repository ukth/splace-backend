import { gql } from "apollo-server";

export default gql`
  type Save {
    id: Int!
    createdAt: String!
    updatedAt: String!
    splace: Splace
    folder: Folder
    savedUser: User
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