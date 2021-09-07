import { gql } from "apollo-server";

export default gql`
  type Chatroom {
    id: Int!
    title: String
    members: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: Int!
    text: String!   
    author: User! 
    chatroom: Chatroom!
    unreadCount: Int!
    createdAt: String!
    isMine: Boolean!
  }
`;