import { gql } from "apollo-server";

export default gql`
  type Mutation {
    checkCertificate(
      certificate: String!
      phone: String!
    ): defaultResult!
  }
`;