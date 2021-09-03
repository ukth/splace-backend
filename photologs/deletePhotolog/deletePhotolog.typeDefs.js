import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deletePhotolog(
      photologId: Int!
    ): defaultResult!
  }
`;