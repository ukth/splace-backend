import { gql } from "apollo-server";

export default gql`
  type createChatroomResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createChatroom(
      title: String
      memberIds: [Int]!
    ): createChatroomResult!
  }
`;