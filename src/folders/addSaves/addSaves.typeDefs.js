import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addSaves(
      splaceIds: [Int]!
      folderId: Int!
    ): defaultResult!
  }
`;