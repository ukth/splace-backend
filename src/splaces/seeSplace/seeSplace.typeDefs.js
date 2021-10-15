import { gql } from "apollo-server";

export default gql`
  type seeSplaceResult {
    ok: Boolean!
    error: String
    splace: Splace
  }
  type Query {
    seeSplace(splaceId: Int!): seeSplaceResult!
  }
`;