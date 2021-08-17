import { gql } from "apollo-server";

export default gql`
  type Query {
    getFeed(userId: Int!, lastId: Int): [Photolog]
  }
`;