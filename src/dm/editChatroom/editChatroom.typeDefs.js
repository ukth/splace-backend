import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editChatroom(
      title: String!
      chatroomId: Int!
    ): defaultResult!
  }
`;