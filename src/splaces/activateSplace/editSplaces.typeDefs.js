import { gql } from "apollo-server";

export default gql`
  type Mutation {
    activateSplace(
      splaceId: Int!
    ): defaultResult!
  }
`;