import { gql } from "apollo-server";

export default gql`
  type Mutation {
    readChatroom(
      chatroomId: Int!
    ): defaultResult!
  }
`;