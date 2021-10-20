import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editPhotolog(
      photologId: Int!
      text: String
      isPrivate: Boolean
    ): defaultResult!
  }
`;