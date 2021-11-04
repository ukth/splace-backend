import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createPreference(
      preference: [Int]!
    ): defaultResult!
  }
`;