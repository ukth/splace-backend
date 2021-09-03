import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createFolder(
      title: String!
    ): defaultResult!
  }
`;