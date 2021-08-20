import { gql } from "apollo-server";

export default gql`
  type scrapLogResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    scrapLog(
      photologId: Int!
    ): scrapLogResult!
  }
`;