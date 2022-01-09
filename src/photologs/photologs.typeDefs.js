import { gql } from "apollo-server";

export default gql`
  type Photolog {
    id: Int!   
    imageUrls: [String]  
    photoSize: Int!
    text: String!   
    createdAt: String! 
    updatedAt: String!
    totalLiked: Int!
    isILiked: Boolean!
    author: User!
    splace: Splace!  
    series: [SeriesElement]
    categories: [Category]
    bigCategories: [BigCategory]
    likedBy: [LikeLog]
    scrapedUser: [ScrapedLog]
    isPrivate: Boolean!
    isScraped: Boolean!
  }
  
`;