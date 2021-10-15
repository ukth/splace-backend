import { gql } from "apollo-server";

export default gql`
  type checkCertificateResult {
    ok: Boolean!
    error: String
    newPhone : String
  }
  type Mutation {
    createAccount(
      certificate: String!
      phone: String!
    ): defaultResult!
  }
`;