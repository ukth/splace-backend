import { gql } from "apollo-server";

export default gql`
  type User {
    userId:         Int!      
    username:       String!   
    name:           String!   
    email:          String!   
    password:       String!   
    profileMessage: String    
    profilePhoto:   String  
    joinedAt:       String!  
    followers:      [User]     
    followings:     [User]     
    photologs:      [Photolog]
    likedPhotologs: [Photolog]
  }
`;

/*export default gql`
  type User {
    userId:         Int!      
    username:       String!   
    name:           String!   
    email:          String!   
    password:       String!   
    profileMessage: String    
    profilePhoto:   String
    folders:        [Folder]    
    joinedAt:       String!  
    followers:      [User]     
    followings:     [User]     
    photologs:      [Photolog]
    likedPhotologs: [Photolog]
    Save:           [Save]
    Series:         [Series]
  }
`;*/