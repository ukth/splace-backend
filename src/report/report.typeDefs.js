import { gql } from "apollo-server";

export default gql`
  type report {
    id: Int!
    sourceType: String!
    sourceId: Int
    reportedUser: User!
    reason: String
    createdAt: String!
    updatedAt: String!
  }
`;