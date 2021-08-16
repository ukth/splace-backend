import { gql } from "apollo-server";

export default gql`
  type Photolog {
    photologId: Int!   
    title: String!
    imageUrls: [String]  
    photoSize: Int!
    text: String   
    createdAt: String! 
    totalLiked: Int
    author: User!
    splace: Splace  
    series: Series
    hashtags: [Hashtag]
    likedUser: [User]
    scrap: [Scrap]
  }
  
`;