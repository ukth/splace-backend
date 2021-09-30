import { gql } from "apollo-server";

export default gql`
  type Mutation {
    uploadMoment(
      splaceId: Int
      videoUrl: String!
      text: String
    ): defaultResult!
  }
`;