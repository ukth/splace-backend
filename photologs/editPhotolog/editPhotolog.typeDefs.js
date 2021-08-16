import { gql } from "apollo-server";

export default gql`
  type editPhotologResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editPhotolog(
      photologId: Int!
      title: String
      imageUrls: [String]
      photoSize: Int
      text: String
      splaceId: Int
      seriesId: Int
      hashtagIds: [Int]
    ): editPhotologResult!
  }
`;