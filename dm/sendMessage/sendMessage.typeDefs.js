import { gql } from "apollo-server";

export default gql`
  type sendMessageResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    sendMessage(chatroomId: Int!, text: String!): sendMessageResult!
  }
`;