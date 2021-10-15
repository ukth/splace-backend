import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSplaces(
      splaceId: Int!
      name: String
      lon: Float
      lat: Float
      address: String
      itemName: String
      itemPrice: Int
      menuUrls: [String]
      hollydayBreak: Boolean
      categoryIds: [Int]
      bigCategoryIds: [Int]
      specialTagIds: [Int]
      parking: Boolean
      pets: Boolean
      kids: Boolean
      breakDays: [Int]
      intro: String
      url: String
      phone: String
    ): defaultResult!
  }
`;