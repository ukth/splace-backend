import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteFolder(
      folderId: Int!
    ): defaultResult!
  }
`;