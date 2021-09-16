import { gql } from "apollo-server";

export default gql`
  type getRoomInfoResult {
    ok: Boolean!
    error: String
    room: Chatroom
  }
  type Query {
    getRoomInfo(chatroomId: Int): getRoomInfoResult!
  }
`;