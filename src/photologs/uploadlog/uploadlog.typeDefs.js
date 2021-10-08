import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadLog(
      title: String!
      imageUrls: [String]
      photoSize: Int!
      text: String
      splaceId: Int
      seriesIds: [Int]
      categoryIds: [Int]
      bigCategoryIds: [Int]
      specialTagIds: [Int]
      isPrivate: Boolean!
    ): defaultResult!
  }
`;