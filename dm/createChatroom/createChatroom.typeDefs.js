import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createChatroom(
      title: String
      memberIds: [Int]!
    ): defaultResult!
  }
`;