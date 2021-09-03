import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unlikeComments(
      commentId: Int!
    ): defaultResult!
  }
`;