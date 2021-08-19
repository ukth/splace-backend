import { gql } from "apollo-server";

export default gql`
  type Query {
    getMine(lastId: Int): [Photolog]
  }
`;