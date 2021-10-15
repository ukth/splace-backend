import { gql } from "apollo-server";

export default gql`
  type Splace {
    id:      Int!      
    name:          String! 
    lat: Float!
    lon: Float!     
    location: String!
    address: String
    opearatingTimes: [String]
    createdAt:  String!
    updatedAt: String!
    ownerId: Int
    timeSets: [TimeSet]
    itemName: String
    itemPrice: Int
    menuUrls: [String]
    hollydayBreak : Boolean!
    badges: [Badge]
    ratingtags: [Ratingtag]
    categories: [Category]
    bigCategories: [BigCategory]
    fixedContents: [FixedContent]
    photologs:     [Photolog]
    breakDays: [Int]
    saves: [Save]
    parking: Boolean!
    pets: Boolean!
    noKids: Boolean!
    intro: String
    url: String
    phone: String
    specialtags: [Specialtag]
    moments: [Moment]
    thumbnail: String
    raffles: [Raffle]
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
  type Badge {
    badgeId: Int!
    name: String!
    splaces: [Splace]
    createdAt: String!
    updatedAt: String!
  }
  type Ratingtag {
    ratingtagId: Int!
    name: String!
    splaces: [Splace]
    createdAt: String!
    updatedAt: String!
  }
  type TimeSet {
    timeSetId: Int!
    open: String!
    close: String!
    day: Int!
    splace: Splace!
    splaceId: Int!
    isBreakTime: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type BreakDay {
    timeSetId: Int!
    week: Int!
    day: Int!
    splace: Splace!
    splaceId: Int!
    createdAt: String!
    updatedAt: String!
  }
`;