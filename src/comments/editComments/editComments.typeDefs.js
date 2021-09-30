import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editComments(
      commentId: Int!
      text: String!
    ): defaultResult!
  }
`;