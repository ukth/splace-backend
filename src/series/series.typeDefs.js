import { gql } from "apollo-server";

export default gql`
  type Series {
    id: Int!
    title: String!
    createdAt: String!
    updatedAt: String!
    isPrivate: Boolean!
    author: User!
    photologs: [SeriesElement]
    isScraped: Boolean!
    scrapedUser: [ScrapedSeries]
  }
  type SeriesElement {
    id: Int!
    order: Int!
    createdAt: String!
    updatedAt: String!
    photolog: Photolog
    photologId: Int
    series: Series!
    seriesId: Int!
  }
`;