import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createSplaces(
      name: String!
    ): defaultResult!
  }
`;