import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSplaces(
      splaceId: Int!
      name: String
      itemName: String
      itemPrice: Int
      menuUrls: [String]
      categories: [String]
      bigCategoryIds: [Int]
      parking: Boolean
      pets: Boolean
      noKids: Boolean
      intro: String
      thumbnail: String
      url: String
      phone: String
      detailAddress: String
    ): defaultResult!
  }
`;