import { gql } from "apollo-server";

export default gql`
  type Comment {
    commentId: Int!   
    text: String!   
    createdAt: String! 
    updatedAt: String!
    totalLiked: Int
    isILiked: Boolean
    author: User!
    photolog: Photolog!
  }
  
`;