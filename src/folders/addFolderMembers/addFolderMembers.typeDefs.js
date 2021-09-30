import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addFolderMembers(memberIds: [Int]!, folderId: Int!): defaultResult!
  }
`;