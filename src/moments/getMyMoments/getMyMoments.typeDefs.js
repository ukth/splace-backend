import { gql } from "apollo-server";

export default gql`
  type getMomentsResult {
    ok: Boolean!
    error: String
    moments: [Moment]
  }  
  type Query {
    getMyMoments(lastId: Int): getMomentsResult!
  }
`;