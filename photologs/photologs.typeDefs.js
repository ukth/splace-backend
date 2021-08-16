import { gql } from "apollo-server";

export default gql`
  type Photolog {
    photologId: Int!   
    imageUrls: [String]  
    photoSize: Int!
    text: String   
    createdAt: String! 
    author: User!
    splace: Splace  
    series: Series
    hashtags: [Hashtag]
    likedUser: [User]
    scrap: [Scrap]
  }
  
`;