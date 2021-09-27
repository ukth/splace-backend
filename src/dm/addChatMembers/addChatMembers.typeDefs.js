import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addChatMembers(memberIds: [Int]!, chatroomId: Int!): defaultResult!
  }
`;