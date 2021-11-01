import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editContents (
      title: String
      text: String
      fixedContentId: Int!
      splaceId: Int!
    ): defaultResult!
  }
`;