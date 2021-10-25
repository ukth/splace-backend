import { gql } from "apollo-server";

export default gql`
  type getNoticesResult {
    ok: Boolean!
    error: String
    notices: [Notice]
  }
  type Mutation {
    getNotices: defaultResult!
  }
`;