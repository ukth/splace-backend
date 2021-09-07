import { gql } from "apollo-server";

export default gql`
  type Photolog {
    id: Int!   
    title: String!
    imageUrls: [String]  
    photoSize: Int!
    text: String   
    createdAt: String! 
    updatedAt: String!
    totalLiked: Int
    isILiked: Boolean
    author: User!
    splace: Splace  
    series: [Series]
    hashtags: [Hashtag]
    likedUser: [User]
    scrap: [Scrap]
  }
  
`;