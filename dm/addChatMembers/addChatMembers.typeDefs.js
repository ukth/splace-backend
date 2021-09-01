import { gql } from "apollo-server";

export default gql`
  type addChatMembersResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addChatMembers(memberIds: [Int]!, chatroomId: Int!): addChatMembersResult!
  }
`;