import { gql } from "apollo-server";

export default gql`
  type searchedSplace{
    endPage: Boolean!,
    id: Int!,
    name: String!,
    geolog: Float,
    geolat: Float,
    address: String,
    createdAt: String,
    ownerId: Int,
    distance: Int
  }
  type searchSplacesResult {
    ok: Boolean!
    error: String
    searchedSplaces: [searchedSplace]
  }
  type Query {
    searchSplaces(
      keyword: String!, 
      lat: Float, 
      long: Float, 
      distance: Int, 
      categoryIds: [Int],
      bigCategoryIds: [Int],
      specialTagIds: [Int],
      ratingTagIds: [Int]): searchSplacesResult!
  }
`;