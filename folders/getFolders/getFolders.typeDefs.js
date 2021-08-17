import { gql } from "apollo-server";

export default gql`
  type Query {
    getFolders(lastId: Int): [Folder]
  }
`;