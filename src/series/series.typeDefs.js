import { gql } from "apollo-server";

export default gql`
  type Series {
    id: Int!
    title: String!
    createdAt: String!
    updatedAt: String!
    isPrivate: Boolean!
    author: User!
    photologs: [Photolog]
    isScraped: Boolean!
    scrap: [ScrapedSeries]
  }
`;