import { gql } from "apollo-server";

export default gql`
  type editSplacesResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editSplaces(
      splaceId: Int!
      name: String
      geolog: Float
      geolat: Float
      address: String
      timeSetIds: [Int]
      itemIds: [Int]
      badgeIds: [Int]
      ratingtagIds: [Int]
      hashtags: [String]
    ): editSplacesResult!
  }
`;