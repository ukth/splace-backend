import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createContents (
      title: String!
      splaceId: Int!
      text: String
      imageUrls: [String]
      photoSize: Int!
    ): defaultResult!
  }
`;