import { gql } from "apollo-server";

export default gql`
  type Query {
    getFeed(userId: Int): [Log]
  }
`;