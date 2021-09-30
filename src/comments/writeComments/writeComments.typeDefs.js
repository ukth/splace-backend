import { gql } from "apollo-server";

export default gql`
  type Mutation {
    writeComments(
      text: String!
      photologId: Int!
    ): defaultResult!
  }
`;