import { gql } from "apollo-server";

export default gql`
  type Series {
    seriesId: Int!
    title: String!
    createdAt: String!
    updatedAt: String!
    author: User!
    photologs: [Photolog]
  }
`;