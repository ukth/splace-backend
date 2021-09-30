import { gql } from "apollo-server";

export default gql`
  type Mutation {
    likePhotolog(
      photologId: Int!
    ): defaultResult!
  }
`;