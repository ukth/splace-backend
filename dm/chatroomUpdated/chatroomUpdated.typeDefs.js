import { gql } from "apollo-server";

export default gql`
  type Subscription {
    chatroomUpdated: Chatroom
  }
`;