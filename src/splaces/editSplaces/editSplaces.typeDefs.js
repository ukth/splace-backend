import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSplaces(
      splaceId: Int!
      name: String
      itemName: String
      itemPrice: Int
      menuUrls: [String]
      categoryIds: [Int]
      bigCategoryIds: [Int]
      specialTagIds: [Int]
      parking: Boolean
      pets: Boolean
      kids: Boolean
      intro: String
      thumbnail: String
      url: String
      phone: String
      cNames: [String]
      bcNames: [String]
      stNames: [String]
    ): defaultResult!
  }
`;