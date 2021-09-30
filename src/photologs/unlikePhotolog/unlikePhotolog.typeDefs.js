import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unlikePhotolog(
      photologId: Int!
    ): defaultResult!
  }
`;