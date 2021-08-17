import { gql } from "apollo-server";

export default gql`
  type Query {
    getSeries(seriesId: Int!, lastId: Int): [Photolog]
  }
`;