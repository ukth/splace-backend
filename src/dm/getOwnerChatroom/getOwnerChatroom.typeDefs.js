import { gql } from "apollo-server";

export default gql`
  type getOwnerChatroomResult {
    ok: Boolean!
    error: String
    chatroom: Chatroom
  }
  type Mutation {
    getOwnerChatroom(splaceId: Int!): getOwnerChatroomResult!
  }
`;