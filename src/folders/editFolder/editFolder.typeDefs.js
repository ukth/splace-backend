import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editFolder(
      folderId: Int!
      title: String!
    ): defaultResult!
  }
`;