import { gql } from "apollo-server";

export default gql`
  type Mutation {
    likeComments(
      commentId: Int!
    ): defaultResult!
  }
`;