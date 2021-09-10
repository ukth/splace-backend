import { gql } from "apollo-server";

export default gql`
  type getRoomMessagesResult {
    ok: Boolean!
    error: String
    id: Int
    messages: [Message]
  }
  type Query {
    getRoomMessages(chatroomId: Int!, lastId: Int): getRoomMessagesResult!
  }
`;