import { gql } from "apollo-server";

export default gql`
  type Mutation {
    logGetSplacesByRatingtag(tagId: Int!): defaultResult!
  }
`;