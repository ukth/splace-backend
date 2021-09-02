import { gql } from "apollo-server";

export default gql`
  type searchedSplace{
    endPage: Boolean!,
    splaceId: Int!,
    name: String!,
    geolog: Float,
    geolat: Float,
    address: String,
    createdAt: String,
    ownerId: Int,
    distance: Int
  }
  type searchSpalcesResult {
    ok: Boolean!
    error: String
    searchedSplaces: [searchedSplace]
  }
  type Query {
    searchSplaces(keyword: String!, lat: Float!, long: Float!): searchSplacesResult!
  }
`;