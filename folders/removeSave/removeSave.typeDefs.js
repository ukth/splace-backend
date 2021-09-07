import { gql } from "apollo-server";

export default gql`
  type Mutation {
    removeSave(
      saveId: Int!,
      folderId: Int!
    ): defaultResult!
  }
`;