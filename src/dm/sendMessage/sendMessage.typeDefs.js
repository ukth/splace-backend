import { gql } from "apollo-server";

export default gql`
  type sendMessageResult {
    ok: Boolean!
    error: String
    message: Message
    readedRecord: ChatroomElement
  }
  type Mutation {
    sendMessage(chatroomId: Int!, text: String!): sendMessageResult!
  }
`;