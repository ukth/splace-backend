import { gql } from "apollo-server";

export default gql`
  type Splace {
    id:      Int!      
    name:          String!      
    geolog:        Float      
    geolat:        Float
    address: String
    opearatingTimes: [String]
    createdAt:  String!
    updatedAt: String!
    ownerId: Int
    timeSets: [TimeSet]
    items: [Item]
    badges: [Badge]
    ratingtags: [Ratingtag]
    hashtags: [Hashtag]
    fixedContents: [FixedContent]
    photologs:     [Photolog]
    saves: [Save]
    parking: Boolean
    pets: Boolean
    kids: Boolean
    intro: String
    url: String
    phone: String
    specialtags: [Specialtag]
    moments: [Moment]
  }
  type FixedContent {
    fixedContentid: Int!
    title: String!
    imageUrl: String
    createdAt: String!
    updatedAt: String!
    splace: Splace!
    text: String
  }
  type Item {
    itemId: Int!
    name: String!
    price: Int
    imageUrls: [String]
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
    open: String!
    close: String!
    day: Int!
    splace: Splace!
    splaceId: Int!
    isBreakTime: Boolean!
  }
`;