import { gql } from "apollo-server";

export default gql`
  type Chatroom {
    id: Int!
    title: String
    members: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
    lastMessage: Message
    chatroomReaded: [ChatroomReaded]
  }

  type Message {
    id: Int!
    text: String!   
    author: User! 
    chatroom: Chatroom!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }

  type ChatroomReaded {
    id: Int!
    user: User
    chatroom: Chatroom
    createdAt: String!
    updatedAt: String!
  }
`;