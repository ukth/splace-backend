import { gql } from "apollo-server";

export default gql`
  type Series {
    seriesid: Int!
    title: String!
    createdAt: String!
    author: User!
    photologs: [Photolog]
  }
`;