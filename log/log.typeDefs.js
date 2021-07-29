import { gql } from "apollo-server";

export default gql`
  type Splace {
    splaceId:      Int!      
    name:          String!      
    geolog:        Float        
    geolat:        Float
    photologs:     [Photolog]
    opentime:      String     
    createdAt:  String!     
  }
  type Hashtag {
    name:     String!
    photolog: [Photolog]
  }

  type Photolog {
    photologId: Int!   
    imageUrls:  [String]  
    text:       String   
    splace:     Splace  
    hashtags:   [String]
    createdAt:  String
    log:       Log      
    user:       User

  }
  type Log {
    logId:     Int!
    title:     String!
    createdAt: String!
    photologs: [Photolog]
    user: User
  }
`;