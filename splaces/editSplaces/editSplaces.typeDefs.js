import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editSplaces(
      splaceId: Int!
      name: String
      geolog: Float
      geolat: Float
      address: String
      timeSetIds: [Int]
      itemIds: [Int]
      hashtags: [String]
      parking: Boolean
      pets: Boolean
      kids: Boolean
      intro: String
      url: String
      phone: String
    ): defaultResult!
  }
`;