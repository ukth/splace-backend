import { gql } from "apollo-server";

export default gql`
  type searchSplaceResult{
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
  type Query {
    searchSplaces(keyword: String!, lat: Float!, long: Float!): [searchSplaceResult]
  }
`;