import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editPhotolog(
      photologId: Int!
      title: String
      imageUrls: [String]
      photoSize: Int
      text: String
      splaceId: Int
      categoryIds: [Int]
      bigCategoryIds: [Int]
      specialTagIds: [Int]
      isPrivate: Boolean
    ): defaultResult!
  }
`;