import { gql } from "apollo-server";

export default gql`
  type User {
    id:         Int!      
    username:       String!   
    name:           String   
    email:          String   
    password:       String!   
    profileMessage: String    
    profileImageUrl:   String
    folders: [Folder]
    birthDay: String
    createdAt:       String!
    updatedAt:      String!
    authority: String!  
    followers:      [User]     
    followings:     [User]     
    photologs:      [Photolog]
    likedPhotologs: [Photolog]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    isBlocked: Boolean!
    totalLogsNumber: Int!
    phone: String!
    url: String
    scrapedLog: [ScrapedLog]
    scrapedSeries: [ScrapedSeries]
    buyRaffleLogs: [BuyRaffleLog]
    activate: Boolean!
    unreadChatExist: Boolean!
    unreadNoticeExist: Boolean!
    preference: [Int]
    marketingAgree: Boolean!
  }
  
  type ScrapedLog {
    id: Int!
    createdAt: String!
    updatedAt: String!
    photolog: Photolog!
    savedUser: User!
  }

  type ScrapedSeries {
    id: Int!
    createdAt: String!
    updatedAt: String!
    series: Series!
    savedUser: User!
  }
`;