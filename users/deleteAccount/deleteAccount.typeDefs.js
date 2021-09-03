import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteAccount(
      userId: Int!
    ): defaultResult!
  }
`;