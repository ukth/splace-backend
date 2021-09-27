import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addSave(
      splaceId: Int!,
      folderId: Int!
    ): defaultResult!
  }
`;