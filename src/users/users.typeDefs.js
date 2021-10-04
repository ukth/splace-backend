import { gql } from "apollo-server";

export default gql`
  type User {
    id:         Int!      
    username:       String!   
    name:           String   
    email:          String!   
    password:       String!   
    profileMessage: String    
    profileImageUrl:   String
    folders: [Folder]
    joinedAt:       String!
    updatedAt:      String!  
    followers:      [User]     
    followings:     [User]     
    photologs:      [Photolog]
    likedPhotologs: [Photolog]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    totalLogsNumber: Int!
    phone: String
    url: String
    scrapedLog: [ScrapedLog]
    scrapedSeries: [ScrapedSeries]
  }
  
  type ScrapedLog {
    id: Int!
    createdAt: String!
    updatedAt: String!
    photolog: Photolog
    savedUser: User
  }

  type ScrapedSeries {
    id: Int!
    createdAt: String!
    updatedAt: String!
    series: Series
    savedUser: User
  }
`;