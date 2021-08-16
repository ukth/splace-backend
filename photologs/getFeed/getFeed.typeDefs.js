import { gql } from "apollo-server";

export default gql`
  type Query {
    getFeed(authorId: Int!, lastId: Int): [Photolog]
  }
`;