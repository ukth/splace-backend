import { gql } from "apollo-server";

export default gql`
  type Query {
    getPhotologs(seriesId: Int): [Photolog]
  }
`;