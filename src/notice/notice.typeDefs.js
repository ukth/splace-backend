import { gql } from "apollo-server";

export default gql`
  type Notice {
    id: Int!
    title: String
    imageUrls: [String]
    text: [String]
    createdAt: String!
    updatedAt: String!
  }
`;