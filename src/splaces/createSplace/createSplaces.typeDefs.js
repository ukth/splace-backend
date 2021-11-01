import { gql } from "apollo-server";

export default gql`
  type createSplaceResult{
    ok: Boolean!
    error: String
    splaceId: Int
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