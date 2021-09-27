import { gql } from "apollo-server";

export default gql`
  type getMeResult{
    ok: Boolean!
    error: String
    me: User
  }
  type Query {
    getMe: getMeResult
  }
`;