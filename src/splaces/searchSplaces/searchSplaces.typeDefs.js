import { gql } from "apollo-server";

export default gql`
  type searchedSplace{
    id: Int!
    address: String
    bigCategories : String
    stringBC: String
    location: String!
    name : String!
    thumbnail: String
  }
  type searchSplacesResult {
    ok: Boolean!
    error: String
    searchedSplaces: [searchedSplace]
  }
  type Query {
    searchSplaces(
      lastId: Int!
      type: String!
      keyword: String, 
      lat: Float,
      long: Float, 
      distance: Int, 
      bigCategoryIds: [Int],
      ratingTagIds: [Int]
      noKids: Boolean
      parking: Boolean
      pets: Boolean
      ): searchSplacesResult!
  }
`;