import { gql } from "apollo-server";

export default gql`
  type Splace {
    splaceId:      Int!      
    name:          String!      
    geolog:        Float      
    geolat:        Float
    address: String
    opearatingTimes: [String]
    createdAt:  String!     
    items: [Item]
    badges: [Badge]
    ratingtags: [Ratingtag]
    hashtags: [Hashtag]
    fixedContents: [FixedContent]
    photologs:     [Photolog]
    saves: [Save]
  }
  type FixedContent {
    fixedContentid: Int!
    title: String!
    imageUrl: String
    createdAt: String!
    splace: Splace!
  }
  type Item {
    itemId: Int!
    splace: Splace!
  }
  type Badge {
    badgeId: Int!
    name: String!
    splace: [Splace]
  }
  type Ratingtag {
    ratingtagId: Int!
    name: String!
    splace: [Splace]
  }
`;