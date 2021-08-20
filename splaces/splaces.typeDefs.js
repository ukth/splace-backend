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
    ownerId: Int
    timeSets: [TimeSet]
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
    text: String
  }
  type Item {
    itemId: Int!
    splace: Splace!
  }
  type Badge {
    badgeId: Int!
    name: String!
    splaces: [Splace]
  }
  type Ratingtag {
    ratingtagId: Int!
    name: String!
    splaces: [Splace]
  }
  type TimeSet {
    timeSetId: Int!
    open: Int!
    close: Int!
    day: Int!
    splace: Splace!
    splaceId: Int!
  }
`;