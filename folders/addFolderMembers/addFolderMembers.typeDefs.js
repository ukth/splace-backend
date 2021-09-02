import { gql } from "apollo-server";

export default gql`
  type addFolderMembersResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addFolderMembers(memberIds: [Int]!, folderId: Int!): addFolderMembersResult!
  }
`;