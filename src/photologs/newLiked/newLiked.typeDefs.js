import { gql } from "apollo-server";

export default gql`
  type newLikedResult {
    user: User
    photolog: Photolog
  }
  type Subscription {
    newLiked: newLikedResult
  }
`;