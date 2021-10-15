import { gql } from "apollo-server";

export default gql`
  type searchedSplace{
    address: String
    bigCategories : String
    categories: String
    intro : String
    location: String!
    name : String!
    ratingTags : String
    thumbnail: String
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
      bigCategoryIds: [Int],
      specialTagIds: [Int],
      ratingTagIds: [Int]): searchSplacesResult!
  }
`;