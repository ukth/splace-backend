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
      hashtags: [String]
      isPrivate: Boolean
    ): defaultResult!
  }
`;