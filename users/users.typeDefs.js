import { gql } from "apollo-server";

export default gql`
  type User {
    userId:         Int!      
    username:       String!   
    name:           String!   
    email:          String!   
    password:       String!   
    profileMessage: String    
    profileImageUrl:   String
    currentLat: Float
    currentLog: Float
    folders: [Folder]
    joinedAt:       String!  
    followers:      [User]     
    followings:     [User]     
    photologs:      [Photolog]
    likedPhotologs: [Photolog]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
  
  type Scrap {
    scrapId: Int!
    createdAt: String!
    photolog: Photolog!
    savedUser: User!
  }
`;