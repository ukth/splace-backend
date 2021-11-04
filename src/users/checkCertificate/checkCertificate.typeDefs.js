import { gql } from "apollo-server";

export default gql`
  type checkCertificateResult{
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    checkCertificate(
      certificate: String!
      phone: String!
    ): checkCertificateResult!
  }
`;