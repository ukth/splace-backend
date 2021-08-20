import { gql } from "apollo-server";

export default gql`
  type addMembersResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addMembers(memberIds: [Int]!, folderId: Int!): addMembersResult!
  }
`;