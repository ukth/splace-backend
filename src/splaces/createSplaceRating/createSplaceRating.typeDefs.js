import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createSplaceRating (
      splaceId: Int!
      rating: Int!
    ): defaultResult!
  }
`;