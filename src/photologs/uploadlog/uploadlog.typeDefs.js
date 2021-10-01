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
      hashtags: [String]
      isPrivate: Boolean!
    ): defaultResult!
  }
`;