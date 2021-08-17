import { gql } from "apollo-server";

export default gql`
  type addSaveResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addSave(
      splaceId: Int!,
      folderId: Int!
    ): addSaveResult!
  }
`;