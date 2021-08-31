import { gql } from "apollo-server";

export default gql`
  type Chatroom {
    chatroomId: Int!
    title: String!
    users: [User]
    message: [Message]
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    messageId: Int!
    text: String!   
    author: User! 
    chatroom: Chatroom! 
    createdAt: String!
  }
`;