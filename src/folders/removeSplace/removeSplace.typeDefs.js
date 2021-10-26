import { gql } from "apollo-server";

export default gql`
  type Mutation {
    removeSplace(
      splaceId: Int!
    ): defaultResult!
  }
`;