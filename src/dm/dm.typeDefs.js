import { gql } from "apollo-server";

export default gql`
  type Chatroom {
    id: Int!
    title: String
    members: [ChatroomElement]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
    lastMessage: Message
    isPersonal: Boolean!
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

  type ChatroomElement{
    id: Int!
    user: User!
    chatroom: Chatroom!
    createdAt: String!
    updatedAt: String!
  }
`;