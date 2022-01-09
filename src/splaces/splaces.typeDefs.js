import { gql } from "apollo-server";

export default gql`
  type Splace {
    id: Int!      
    name: String! 
    lat: Float!
    lon: Float!     
    address: String!
    detailAddress: String
    createdAt:  String!
    updatedAt: String!
    ownerId: Int
    businessHours: [BusinessHour]
    itemName: String
    itemPrice: Int
    menuUrls: [String]
    holidayBreak : Boolean!
    ratingtags: [Ratingtag]
    categories: [Category]
    bigCategories: [BigCategory]
    fixedContents: [FixedContent]
    photologs:     [Photolog]
    totalPhotologs: Int!
    breakDays: [Int]
    folders: [Save]
    owner: User
    APIId: Int
    parking: Boolean!
    pets: Boolean!
    noKids: Boolean!
    intro: String
    url: String
    phone: String
    thumbnail: String
    raffles: [Raffle]
    activate: Boolean!
    isSaved: Boolean!
  }
  type FixedContent {
    id: Int!
    title: String!
    imageUrls: [String]
    createdAt: String!
    photoSize: Int!
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
  type BusinessHour {
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