import { gql } from "apollo-server";

export default gql`
  type Subscription {
    newMessage(chatroomId: Int!): Message
  }
`;