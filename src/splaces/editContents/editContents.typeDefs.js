import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editContents (
      title: String
      imageUrl: String
      text: String
      splaceId: Int!
      fixedContentId: Int!
    ): defaultResult!
  }
`;