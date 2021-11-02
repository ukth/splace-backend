import { gql } from "apollo-server";

export default gql`
  type createSplaceResult{
    ok: Boolean!
    error: String
    splace: Splace
  }
  type Mutation {
    createSplaces(
      name: String!
      lat: Float!
      lon: Float!
      detailAddress: String
    ): createSplaceResult!
  }
`;