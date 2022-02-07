import { gql } from "apollo-server";

export default gql`
  type searchedSplace{
    id: Int!
    address: String
    bigCategories : String
    stringBC: String
    location: String!
    name : String!
    thumbnail: String,
    isSaved: Boolean!
    photoSize: Int
  }
  type searchSplacesResult {
    ok: Boolean!
    error: String
    searchedSplaces: [searchedSplace]
  }
  type Query {
    searchSplaces(
      lastId: Int
      type: String!
      keyword: String!, 
      lat: Float,
      lon: Float, 
      distance: Int, 
      bigCategoryIds: [Int],
      ratingtagIds: [Int],
      exceptNoKids: Boolean
      parking: Boolean
      pets: Boolean
      ): searchSplacesResult!
  }
`;