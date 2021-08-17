import { gql } from "apollo-server";

export default gql`
  type addMemberResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    addMember(targetId: Int!, folderId: Int!): addMemberResult!
  }
`;