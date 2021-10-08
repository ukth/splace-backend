import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSplaces(
      splaceId: Int!
      name: String
      lon: Float
      lat: Float
      address: String
      itemId: Int
      categoryIds: [Int]
      bigCategoryIds: [Int]
      specialTagIds: [Int]
      parking: Boolean
      pets: Boolean
      kids: Boolean
      intro: String
      url: String
      phone: String
    ): defaultResult!
  }
`;