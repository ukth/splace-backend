import { gql } from "apollo-server";

export default gql`
  type quitChatroomResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    quitChatroom(chatroomId: Int!): quitChatroomResult!
  }
`;