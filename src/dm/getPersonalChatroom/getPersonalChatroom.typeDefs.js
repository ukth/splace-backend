import { gql } from "apollo-server";

export default gql`
  type getPersonalChatroomResult {
    ok: Boolean!
    error: String
    chatroom: Chatroom
  }
  type Mutation {
    getPersonalChatroom(targetId: Int!): getPersonalChatroomResult!
  }
`;