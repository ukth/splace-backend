import { gql } from "apollo-server";

export default gql`
  type Mutation {
    quitFolder(folderId: Int!): defaultResult!
  }
`;