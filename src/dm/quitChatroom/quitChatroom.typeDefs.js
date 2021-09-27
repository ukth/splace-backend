import { gql } from "apollo-server";

export default gql`
  type Mutation {
    quitChatroom(chatroomId: Int!): defaultResult!
  }
`;