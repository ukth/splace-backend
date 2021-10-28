import { gql } from "apollo-server";

export default gql`
  type Splace {
    id:      Int!      
    name:          String! 
    lat: Float!
    lon: Float!     
    location: String!
    address: String
    detailAddress: String
    opearatingTimes: [String]
    createdAt:  String!
    updatedAt: String!
    ownerId: Int
    timeSets: [TimeSet]
    itemName: String
    itemPrice: Int
    menuUrls: [String]
    holidayBreak : Boolean!
    ratingtags: [Ratingtag]
    categories: [Category]
    bigCategories: [BigCategory]
    fixedContents: [FixedContent]
    photologs:     [Photolog]
    totalPhotologs: Int
    breakDays: [Int]
    saves: [Save]
    owner: User
    kakaoId: Int
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
    activate: Boolean!
  }
  type FixedContent {
    id: Int!
    title: String!
    imageUrls: [String]
    createdAt: String!
    updatedAt: String!
    splace: Splace!
    text: String
  }
  type Ratingtag {
    id: Int!
    name: String!
    splaces: [Splace]
    color: String
    createdAt: String!
    updatedAt: String!
  }
  type TimeSet {
    id: Int!
    open: String
    close: String
    breakOpen: String
    breakClose: String
    day: Int!
    splace: Splace!
    splaceId: Int!
    createdAt: String!
    updatedAt: String!
  }
  type SplaceRating {
    id: Int!
    userId: Int!
    splaceId: Int!
    rating: Int!
    createdAt: String!
    updatedAt: String!
  }
`;