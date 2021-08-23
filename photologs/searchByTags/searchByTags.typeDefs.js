import { gql } from "apollo-server";

export default gql`
  type Query {
    searchByTags(hashtagId: Int!, lastId: Int): [Photolog]
  }
`;