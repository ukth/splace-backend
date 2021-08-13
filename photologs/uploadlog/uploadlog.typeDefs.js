import { gql } from "apollo-server";

export default gql`
  type uploadLogResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    uploadLog(
      title: String!
      texts: [String]
      photoLogsUrls: [[String]]
      splaceIds: [Int]
      hashtags: [[String]]
    ): uploadLogResult!
  }
`;