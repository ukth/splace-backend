import { gql } from "apollo-server";

export default gql`
  type Query {
    seeFeed(userId: Int): [Log]
  }
`;